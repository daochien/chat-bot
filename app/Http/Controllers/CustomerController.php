<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function all()
    {
        $customers = Customer::all();
        return response()->json([
            'customers' => $customers
        ], 200);
    }

    public function get($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json([
            'customer' => $customer
        ], 200);
    }

    public function new(Request $request)
    {
        $customer = Customer::create($request->only(['name', 'email', 'phone', 'website']));
        return response()->json([
            'customer' => $customer
        ], 200);
    }
}