@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">

        <!-- 🎯 Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0"><i class="ri-user-search-line me-2"></i> Detail Karyawan</h4>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- 👤 Profil Karyawan -->
            <div class="col-md-6 mb-4">
                <div class="card h-100 border-start border-primary border-3 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title"><i class="ri-user-3-line me-2"></i> Profil Karyawan</h5>
                        <dl class="row mb-0">
                            <dt class="col-sm-5">Nama</dt>
                            <dd class="col-sm-7 text-muted">{{ $employee->nama_karyawan }}</dd>

                            <dt class="col-sm-5">Vendor</dt>
                            <dd class="col-sm-7 text-muted">{{ $employee->nama_vendor }}</dd>

                            <dt class="col-sm-5">NIK OS</dt>
                            <dd class="col-sm-7 text-muted">{{ $employee->nik_os }}</dd>

                            <dt class="col-sm-5">Status</dt>
                            <dd class="col-sm-7">
                                <span class="badge bg-{{ $employee->status === 'aktif' ? 'success' : ($employee->status === 'terminated' ? 'danger' : 'secondary') }}">
                                    {{ $employee->status }}
                                </span>
                            </dd>
                        </dl>
                    </div>
                </div>

            </div>

            <!-- 📊 Statistik Planning -->
            <div class="col-md-6 mb-4">
                <div class="card h-100 border-start border-success border-3 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title"><i class="ri-calendar-check-line me-2"></i> Statistik Planning</h5>
                        <dl class="row mb-0">
                            <dt class="col-sm-5">Total Plotting</dt>
                            <dd class="col-sm-7 text-muted">{{ $plotCount }}</dd>

                            <dt class="col-sm-5">Planning Unik</dt>
                            <dd class="col-sm-7 text-muted">{{ $uniquePlannings }}</dd>


                        </dl>
                    </div>
                </div>
            </div>

            <!-- ⏱ Statistik Kehadiran -->
            <div class="col-md-6 mb-4">
                <div class="card h-100 border-start border-warning border-3 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title"><i class="ri-bar-chart-line me-2"></i> Statistik Kehadiran</h5>
                        <dl class="row mb-0">
                            <dt class="col-sm-5">Jumlah Hadir</dt>
                            <dd class="col-sm-7 text-muted">{{ $hadirCount }}</dd>

                            <dt class="col-sm-5">Tidak Hadir</dt>
                            <dd class="col-sm-7 text-muted">{{ $tidakHadirCount }}</dd>

                            <dt class="col-sm-5">Tidak Konfirmasi</dt>
                            <dd class="col-sm-7 text-muted">{{ $tidakKonfirmasiCount }}</dd>
                            
                            <dt class="col-sm-5">Alasan Terbanyak</dt>
                            <dd class="col-sm-7 text-muted">{{ $topReason ?? '-' }}</dd>


                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <!-- 📋 Tabel Plotting -->
        <div class="card mt-4 shadow-sm animate__animated animate__fadeIn">
            <div class="card-header bg-light">
                <h5><i class="ri-table-line me-2"></i> Riwayat Plotting Karyawan</h5>
            </div>
            <div class="card-body table-responsive">
                <table class="table table-bordered table-hover table-striped align-middle">
                    <thead class="table-light">
                        <tr>
                            <th><i class="ri-calendar-line"></i> Tanggal Plot</th>
                            <th><i class="ri-user-check-line"></i> Status Konfirmasi</th>
                            <th><i class="ri-time-line"></i> Shift</th>
                            <th><i class="ri-calendar-2-line"></i> Periode Planning</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($employee->plottingKehadiran as $plot)
                        <tr>
                            <td>{{ \Carbon\Carbon::parse($plot->tanggal)->format('d M Y') }}</td>
                            <td>{{ ucfirst($plot->status_konfirmasi) }}</td>
                            <td>{{ $plot->planning->shift ?? '-' }}</td>
                            <td>
                                {{ \Carbon\Carbon::parse($plot->planning->start_date)->format('d M') }} -
                                {{ \Carbon\Carbon::parse($plot->planning->end_date)->format('d M Y') }}
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="4" class="text-center text-muted"><em>Belum ada data plotting.</em></td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
@endsection