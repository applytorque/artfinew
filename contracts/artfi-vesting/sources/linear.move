module linea_vesting::linear_vesting {
    // === Imports ===

    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::clock::{Self, Clock};
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::transfer;

    // === Errors ===

    // @dev Error code for invalid start date
    const EInvalidStartDate: u64 = 0;

    // === Structs ===

    // Wallet struct
    struct Wallet<phantom T> has key, store {
        id: UID,
        // Balance of the wallet
        balance: Balance<T>,
        // Start date of the claiming
        start: u64,
        // Total amount of Coin released
        released: u64,
        // Duration of the vesting
        duration: u64
    }

   
   
    public fun new<T>(token: Coin<T>, c: &Clock, start: u64, duration: u64, ctx: &mut TxContext): Wallet<T> {
        assert!(start >= clock::timestamp_ms(c), EInvalidStartDate);
            Wallet {
            id: object::new(ctx),
            balance: coin::into_balance(token),
            released: 0,            start, 
            duration,
        }
    }

   
    entry fun entry_new<T>(token: Coin<T>, c: &Clock, start: u64, duration: u64, receiver: address, ctx: &mut TxContext) {
        transfer::public_transfer(new(token, c, start, duration, ctx), receiver);
    }

    public fun vesting_status<T>(self: &Wallet<T>, c: &Clock): u64 {
        linear_vested_amount(
            self.start, 
            self.duration, 
            balance::value(&self.balance), 
            self.released, 
            clock::timestamp_ms(c)
        ) - self.released
    }


    public fun claim<T>(self: &mut Wallet<T>, c: &Clock, ctx: &mut TxContext): Coin<T> {
        let releasable = vesting_status(self, c);

        *&mut self.released = self.released + releasable;

        coin::from_balance(balance::split(&mut self.balance, releasable), ctx)
    }

  
    entry fun entry_claim<T>(self: &mut Wallet<T>, c: &Clock, ctx: &mut TxContext) {
        transfer::public_transfer(claim(self, c, ctx), tx_context::sender(ctx));
    }

    public fun destroy_zero<T>(self: Wallet<T>) {
        let Wallet { id, start: _, duration: _, balance, released: _} = self;
        object::delete(id);
        balance::destroy_zero(balance);
    }


    entry fun entry_destroy_zero<T>(self: Wallet<T>) {
        destroy_zero(self);
    }


    public fun balance<T>(self: &Wallet<T>): u64 {
        balance::value(&self.balance)
    }

 
    public fun start<T>(self: &Wallet<T>): u64 {
        self.start
    }  


    public fun released<T>(self: &Wallet<T>): u64 {
        self.released
    }

    public fun duration<T>(self: &Wallet<T>): u64 {
        self.duration
    }  

    fun linear_vested_amount(start: u64, duration: u64, balance: u64, already_released: u64, timestamp: u64): u64 {
        linear_vesting_schedule(start, duration, balance + already_released, timestamp)
    }


    fun linear_vesting_schedule(start: u64, duration: u64, total_allocation: u64, timestamp: u64): u64 {
        if (timestamp < start) return 0;
        if (timestamp > start + duration) return total_allocation;
        (total_allocation * (timestamp - start)) / duration
    }   
}