@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card" id="ticketsList">
                    <div class="card-header border-0">
                        <div class="d-flex align-items-center">
                            <h5 class="card-title mb-0 flex-grow-1">Plotting Kehadiran - Group: {{ $planning->group }}</h5>
                            <p class="card-title mb-0 flex-grow-1">Periode: {{ \Carbon\Carbon::parse($planning->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($planning->end_date)->format('d M Y') }}</p>
                            <p class="card-title mb-0 flex-grow-1">Shift: {{ ($planning->shift) }} </p>

                            <div class="flex-shrink-0">
                                <div class="d-flex flex-wrap gap-2">
                                    <a href="{{ route('admin_produksi.data_planing') }}" class="btn btn-secondary">Kembali</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body border border-dashed border-end-0 border-start-0">
                        <form>
                            <div class="row g-3">
                                <div class="col-xxl-5 col-sm-12">
                                    <div class="search-box">
                                        <input type="text" class="form-control search" id="searchField" placeholder="Cari Planning...">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>
                                </div>
                                <!--end col-->
                            </div>
                            <!--end row-->
                        </form>
                    </div>
                    <!--end card-body-->
                    <div class="card-body">
                        <div class="table-responsive table-card mb-4">
                            <table class="table align-middle table-nowrap mb-0" id="ticketTable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Karyawan</th>
                                        <th>NIK OS</th>
                                        <th>Tanggal Diinfokan</th>
                                        <th>Status Konfirmasi</th>
                                    </tr>
                                </thead>
                                <tbody class="list form-check-all" id="ticket-list-data">
                                    @forelse ($planning->plottingKehadiran as $index => $plot)
                                    <tr>
                                        <td>{{ $index + 1 }}</td> <!-- Kolom No -->
                                        <td class="nama-karyawan">{{ $plot->employee->nama_karyawan }}</td>
                                        <td class="nik-os">{{ $plot->employee->nik_os }}</td>
                                        <td class="tanggal">{{ $plot->tanggal }}</td>
                                        <td class="status-konfirmasi">
                                            @if ($plot->status_konfirmasi === 'hadir')
                                            <span class="badge bg-success">Hadir</span>
                                            @elseif ($plot->status_konfirmasi === 'tidak')
                                            <span class="badge bg-danger">Tidak Hadir</span>
                                            @else
                                            <span class="badge bg-secondary">Belum Konfirmasi</span>
                                            @endif
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="5" class="text-center">Belum ada plotting.</td>
                                    </tr>
                                    @endforelse
                                </tbody>

                            </table>
                            <div class="noresult" style="display: none">
                                <div class="text-center">
                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px">
                                    </lord-icon>
                                    <h5 class="mt-2">Sorry! No Result Found</h5>
                                    <!-- <p class="text-muted mb-0">We've searched more than 150+ Tickets We did not find any Tickets for you search.</p> -->
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-2">
                            <div class="pagination-wrap hstack gap-2">
                                <a class="page-item pagination-prev disabled" href="#">
                                    Previous
                                </a>
                                <ul class="pagination listjs-pagination mb-0"></ul>
                                <a class="page-item pagination-next" href="#">
                                    Next
                                </a>
                            </div>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade flip" id="deleteOrder" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body p-5 text-center">
                                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style="width:90px;height:90px">
                                        </lord-icon>
                                        <div class="mt-4 text-center">
                                            <h4>You are about to delete a order ?</h4>
                                            <p class="text-muted fs-14 mb-4">Deleting your order will remove all of
                                                your information from our database.</p>
                                            <div class="hstack gap-2 justify-content-center remove">
                                                <button class="btn btn-link link-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                                                <button class="btn btn-danger" id="delete-record">Yes, Delete It</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end modal -->
                    </div>
                    <!--end card-body-->
                </div>
                <!--end card-->
            </div>
            <!--end col-->
        </div>
    </div>
</div>
<script>
    $(document).ready(function() {
        $('.search').on('keyup', function() {
            let keyword = $(this).val().toLowerCase();
            let found = false;

            $('#ticket-list-data tr').each(function() {
                let rowText = $(this).text().toLowerCase();

                if (rowText.indexOf(keyword) > -1) {
                    $(this).show();
                    found = true;
                } else {
                    $(this).hide();
                }
            });

            if (!found) {
                $('.noresult').show();
            } else {
                $('.noresult').hide();
            }
        });
    });
</script>
@endsection