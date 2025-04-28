@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <h1 class="text-2xl font-bold mb-6">Pembagian Jadwal Karyawan</h1>

        @if(session('success'))
        <div class="bg-green-100 text-green-800 p-4 rounded mb-4">
            {{ session('success') }}
        </div>
        @endif

        <form action="{{ route('schedule.store') }}" method="POST" class="space-y-6">
            @csrf

            {{-- Input Minggu, Bulan, Tahun --}}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Minggu ke-</label>
                    <input type="number" name="week" required class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                </div>

                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Bulan</label>
                    <select name="month" required class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                        @foreach(range(1,12) as $month)
                        <option value="{{ $month }}" {{ $month == now()->month ? 'selected' : '' }}>
                            {{ DateTime::createFromFormat('!m', $month)->format('F') }}
                        </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Tahun</label>
                    <input type="number" name="year" value="{{ now()->year }}" required class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                </div>
            </div>

            {{-- List Karyawan per Group --}}
            @foreach ($groups as $group)
            <div class="bg-white shadow-md rounded p-4 mb-6">
                <h2 class="text-xl font-semibold mb-4">Group: {{ $group ?? 'Tanpa Group' }}</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach ($employees->where('grup', $group) as $employee)
                    <div class="flex items-center space-x-2">
                        <input type="checkbox" name="employee_ids[]" value="{{ $employee->id }}" id="employee-{{ $employee->id }}" class="accent-blue-500 w-5 h-5">
                        <label for="employee-{{ $employee->id }}" class="text-gray-800">{{ $employee->nama_karyawan }}</label>
                    </div>
                    @endforeach
                </div>
            </div>
            @endforeach

            {{-- Tombol Simpan --}}
            <div class="flex justify-end">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                    Simpan Jadwal
                </button>
            </div>
        </form>
    </div>
</div>
@endsection