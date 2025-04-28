@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <h1 class="text-2xl font-bold mb-6">Lihat Jadwal Mingguan</h1>

        {{-- Filter --}}
        <form action="{{ route('schedule.view') }}" method="GET" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Minggu ke-</label>
                <select name="week" class="w-full p-2 border rounded">
                    <option value="">Semua</option>
                    @foreach($weeks as $week)
                    <option value="{{ $week }}" {{ request('week') == $week ? 'selected' : '' }}>
                        {{ $week }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Bulan</label>
                <select name="month" class="w-full p-2 border rounded">
                    <option value="">Semua</option>
                    @foreach($months as $month)
                    <option value="{{ $month }}" {{ request('month') == $month ? 'selected' : '' }}>
                        {{ DateTime::createFromFormat('!m', $month)->format('F') }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Tahun</label>
                <input type="number" name="year" value="{{ request('year', $currentYear) }}" class="w-full p-2 border rounded">
            </div>

            <div class="flex items-end">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                    Tampilkan
                </button>
            </div>
        </form>

        {{-- Tabel Jadwal --}}
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-3 px-6 text-left">Nama Karyawan</th>
                        <th class="py-3 px-6 text-left">Group</th>
                        <th class="py-3 px-6 text-center">Minggu</th>
                        <th class="py-3 px-6 text-center">Bulan</th>
                        <th class="py-3 px-6 text-center">Tahun</th>
                        <th class="py-3 px-6 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($schedules as $schedule)
                    <tr class="border-b hover:bg-gray-50">
                        <td class="py-3 px-6">{{ $schedule->employee->nama_karyawan ?? '-' }}</td>
                        <td class="py-3 px-6">{{ $schedule->group }}</td>
                        <td class="py-3 px-6 text-center">{{ $schedule->week }}</td>
                        <td class="py-3 px-6 text-center">{{ DateTime::createFromFormat('!m', $schedule->month)->format('F') }}</td>
                        <td class="py-3 px-6 text-center">{{ $schedule->year }}</td>
                        <td class="py-3 px-6 text-center">
                            @if($schedule->status_hadir)
                            <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Hadir</span>
                            @else
                            <span class="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Tidak Hadir</span>
                            @endif
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="py-6 text-center text-gray-500">Belum ada jadwal ditemukan.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection