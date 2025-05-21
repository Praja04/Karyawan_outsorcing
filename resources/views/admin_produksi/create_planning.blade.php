@extends('layout') {{-- Pastikan layout utama kamu pakai ini --}}

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xxl-12">
                <div class="d-flex flex-column h-100">
                    <div class="row h-100">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body p-0">


                                    <div class="row align-items-end">
                                        <div class="col-sm-10">
                                            <div class="p-3">
                                                <h1>Buat Perencanaan Kebutuhan Karyawan </h1>
                                                <div class="mt-3">
                                                    <p class="fs-16 lh-base">
                                                        Kelola karyawan anda!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="px-3">
                                                <img src="{{asset('/material/assets/images/user-illustarator-2.png')}}" class="img-fluid" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div> <!-- end card-body-->
                            </div>
                        </div> <!-- end col-->
                    </div> <!-- end row-->

                </div>
            </div> <!-- end col-->


        </div>

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
                        <div>
                            <form action="{{ route('admin_produksi.planning.store') }}" method="POST">
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
                                    <label for="kode_bagian" class="form-label">Kode Bagian</label>
                                    <select name="kode_bagian" class="form-control" required>
                                        <option value="">-- Pilih Kode Bagian --</option>
                                        @foreach ($kodeBagians as $bagian)
                                        <option value="{{ $bagian }}" {{ old('kode_bagian') == $bagian ? 'selected' : '' }}>{{ $bagian }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="kode_jabatan" class="form-label">Kode Jabatan</label>
                                    <select name="kode_jabatan" class="form-control" required>
                                        <option value="">-- Pilih Kode Jabatan --</option>
                                        @foreach ($kodeJabatans as $jabatan)
                                        <option value="{{ $jabatan }}" {{ old('kode_jabatan') == $jabatan ? 'selected' : '' }}>{{ $jabatan }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="shift" class="form-label">Shift</label>
                                    <select name="shift" class="form-control" required>
                                        <option value="">-- Pilih Shift --</option>
                                        @foreach ($shifts as $shift)
                                        <option value="{{ $shift }}" {{ old('shift') == $shift ? 'selected' : '' }}>Shift {{ $shift }}</option>
                                        @endforeach
                                    </select>
                                </div>


                                <div class="mb-3">
                                    <label for="jumlah_karyawan" class="form-label">Jumlah Karyawan</label>
                                    <input type="number" name="jumlah_karyawan" class="form-control" min="1" required value="{{ old('jumlah_karyawan') }}">
                                </div>

                                <div class="text-end">
                                    <button type="submit" class="btn btn-primary">Simpan Planning</button>
                                    <a href="{{ route('admin_produksi.dashboard') }}" class="btn btn-secondary">Kembali</a>
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