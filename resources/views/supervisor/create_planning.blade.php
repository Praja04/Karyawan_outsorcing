@extends('layout') {{-- Pastikan layout utama kamu pakai ini --}}

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <h2 class="mb-4">Buat Perencanaan Kebutuhan Karyawan</h2>

        @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        @if ($errors->any())
        <div class="alert alert-danger">
            <strong>Terjadi kesalahan:</strong>
            <ul>
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif


        <div class="row">
            <div class="col-xxl-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Perencanaan Kebutuhan Karyawan</h4>
                    
                    </div><!-- end card header -->

                    <div class="card-body">
                        <div >
                            <form action="{{ route('supervisor.planning.store') }}" method="POST">
                                @csrf

                                <div class="mb-3">
                                    <label for="start_date" class="form-label">Tanggal Mulai</label>
                                    <input type="date" name="start_date" class="form-control" required value="{{ old('start_date') }}">
                                </div>

                                <div class="mb-3">
                                    <label for="end_date" class="form-label">Tanggal Selesai</label>
                                    <input type="date" name="end_date" class="form-control" required value="{{ old('end_date') }}">
                                </div>

                                <div class="mb-3">
                                    <label for="group" class="form-label">Group</label>
                                    <select name="group" class="form-control" required>
                                        <option value="">-- Pilih Group --</option>
                                        @foreach ($groups as $group)
                                        <option value="{{ $group }}" {{ old('group') == $group ? 'selected' : '' }}>Group {{ $group }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="jumlah_karyawan" class="form-label">Jumlah Karyawan</label>
                                    <input type="number" name="jumlah_karyawan" class="form-control" min="1" required value="{{ old('jumlah_karyawan') }}">
                                </div>

                                <div class="text-end">
                                    <button type="submit" class="btn btn-primary">Simpan Planning</button>
                                    <a href="{{ route('supervisor.dashboard') }}" class="btn btn-secondary">Kembali</a>
                                </div>
                            </form>
                        </div>
                    </div><!-- end card-body -->
                </div>
            </div>
        </div>

    </div>
</div>
@endsection