@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">

        <div class="row">
            <div class="col">

                <div class="h-100">
                    <div class="row mb-3 pb-1">
                        <div class="col-12">
                            <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                                <div class="flex-grow-1">
                                    <h4 class="fs-16 mb-1">Welcome, {{Session::get('username')}}</h4>
                                    <p class="text-muted mb-0">Here's what's happening with your employee today.</p>
                                </div>
                                <div class="mt-3 mt-lg-0">
                                    <form action="javascript:void(0);">
                                        <div class="row g-3 mb-0 align-items-center">
                                            <div class="col-sm-auto">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0 dash-filter-picker shadow" data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y" data-deafult-date="01 Jan 2022 to 31 Jan 2022">
                                                    <div class="input-group-text bg-primary border-primary text-white">
                                                        <i class="ri-calendar-2-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--end col-->

                                            <!--end col-->
                                            <div class="col-auto">
                                                <button type="button" class="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn shadow-none"><i class="ri-pulse-line"></i></button>
                                            </div>
                                            <!--end col-->
                                        </div>
                                        <!--end row-->
                                    </form>
                                </div>
                            </div><!-- end card header -->
                        </div>
                        <!--end col-->
                    </div>
                    <!--end row-->

                    <div class="row">
                     
                        <div class="col-xl-4 col-md-6">
                            <!-- card -->
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Planning Active</p>
                                        </div>

                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" id="activePlanningCount"></span> </h4>

                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-warning rounded fs-3">
                                                <i class="bx bx-user-circle"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div><!-- end card body -->
                            </div>
                        </div><!-- end col -->

                        <div class="col-xl-4 col-md-6">
                            <!-- card -->
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Total Kebutuhan Hari ini</p>
                                        </div>

                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" id="totalKebutuhanHariIni"></span> </h4>

                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-warning rounded fs-3">
                                                <i class="bx bx-user-circle"></i>
                                            </span>
                                        </div>
                                    </div>

                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end col -->

                        <div class="col-xl-4 col-md-6">
                            <!-- card -->
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0"> Total Sudah Diplotting Hari Ini</p>
                                        </div>

                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" id="totalSudahDipplotHariIni"></span> </h4>

                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-warning rounded fs-3">
                                                <i class="bx bx-user-circle"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end col -->

                    </div> <!-- end row-->

                    <div class="row">
                        <div class="col-xl-7">
                            <div class="card">
                                <div class="card-header border-0 align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1">Kebutuhan Planning dan Plotting</h4>

                                </div><!-- end card header -->

                                <div class="card-body p-0 pb-2">
                                    <div class="w-100">
                                        <div id="grafikRange"></div>
                                    </div>
                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end col -->

                        <div class="col-xl-5">
                            <div class="card">
                                <div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1">
                                        Upcoming Activities
                                    </h4>
                                    <div class="flex-shrink-0">
                                        <div class="dropdown card-header-dropdown">
                                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="#">Edit</a>
                                                <a class="dropdown-item" href="#">Remove</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card header -->
                                <div class="card-body pt-0">
                                    <ul id="activePlanningList" class="list-group list-group-flush border-dashed">
                                        <!-- Diisi oleh jQuery -->
                                    </ul>

                                    <!-- end -->
                                    <div class="align-items-center mt-2 row g-3 text-center text-sm-start">
                                        <div class="col-sm">
                                            <div class="text-muted">
                                                Showing
                                                <span class="fw-semibold" id="totalCount"></span>
                                                Results
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <ul id="pagination" class="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
                                                <!-- Diisi jQuery -->
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <!-- end card body -->
                            </div>
                            <!-- end card -->
                        </div>
                        <!-- end col -->
                    </div>



                </div> <!-- end .h-100-->

            </div> <!-- end col -->
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card" id="ticketsList">
                    <div class="card-header border-0">
                        <div class="d-flex align-items-center">
                            <h5 class="card-title mb-0 flex-grow-1">Data Planning</h5>

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
                                        <th>Group</th>
                                        <th>Bagian</th>
                                        <th>Jabatan</th>
                                        <th>Jumlah Karyawan</th>
                                        <th>Shift</th>
                                        <th>Tanggal Mulai</th>
                                        <th>Tanggal Selesai</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody class="list form-check-all" id="ticket-list-data">
                                    @forelse ($plannings as $plan)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $plan->group }}</td>
                                        <td>{{ $plan->kode_bagian }}</td>
                                        <td>{{ $plan->kode_jabatan }}</td>
                                        <td>{{ $plan->jumlah_karyawan }}</td>
                                        <td>{{ $plan->shift }}</td>
                                        <td>{{ \Carbon\Carbon::parse($plan->start_date)->format('d M Y') }}</td>
                                        <td>{{ \Carbon\Carbon::parse($plan->end_date)->format('d M Y') }}</td>
                                        <td>
                                            @if (\Carbon\Carbon::now()->gt(\Carbon\Carbon::parse($plan->end_date)))
                                            <span class="badge bg-secondary">Tidak Aktif</span>
                                            @else
                                            <span class="badge bg-success">Aktif</span>
                                            @endif
                                        </td>
                                        <td>
                                            <a href="{{ route('foreman.plotting.show', $plan->id) }}" class="btn btn-info btn-sm">
                                                View
                                            </a>

                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="5" class="text-center">Belum ada planning dibuat</td>
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
    <!-- container-fluid -->
</div>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script>
    $(document).ready(function() {
        // Fungsi untuk load data dari API

        let currentPage = 1;
        let perPage = 1; // ← Ubah ini untuk jumlah data per halaman
        let allPlanningData = []; // Simpan semua data
        function renderPlanningPage() {
            const planningList = $('#activePlanningList');
            planningList.empty();

            const start = (currentPage - 1) * perPage;
            const end = start + perPage;
            const pageData = allPlanningData.slice(start, end);

            pageData.forEach(item => {
                const startDate = new Date(item.start_date);
                const day = ('0' + startDate.getDate()).slice(-2);
                const month = ('0' + (startDate.getMonth() + 1)).slice(-2);
                const year = startDate.getFullYear().toString().slice(-2);
                const dayName = startDate.toLocaleString('en-US', {
                    weekday: 'short'
                });
                const tanggalDisplay = `${day}-${month}-${year}`;

                const html = `
            <li class="list-group-item ps-0">
                <div class="row align-items-center g-3">
                    <div class="col-auto">
                        <div class="avatar-sm p-1 py-2 h-auto bg-light rounded-3 shadow">
                            <div class="text-center">
                                <h5 class="mb-0">${day}</h5>
                                <div class="text-muted">${dayName}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <h5 class="text-muted mt-0 mb-1 fs-13">
                            ${tanggalDisplay} (${item.group}) - ${item.jumlah_karyawan} Orang
                        </h5>
                        <p class="text-reset fs-14 mb-0">
                            Shift ${item.shift} - ${item.kode_bagian} - ${item.kode_jabatan}
                        </p>
                    </div>
                </div>
            </li>
        `;
                planningList.append(html);
            });

            // Update text showing
            $('#totalCount').text(allPlanningData.length);

            // Render ulang pagination
            renderPagination();
        }

        function renderPagination() {
            const pagination = $('#pagination');
            pagination.empty();

            const totalPages = Math.ceil(allPlanningData.length / perPage);

            pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="page-link" data-page="${currentPage - 1}">←</a>
        </li>
    `);

            for (let i = 1; i <= totalPages; i++) {
                pagination.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a href="#" class="page-link" data-page="${i}">${i}</a>
            </li>
        `);
            }

            pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a href="#" class="page-link" data-page="${currentPage + 1}">→</a>
        </li>
    `);
        }

        function loadDashboardSummary() {
            $.ajax({
                url: "{{url('/admin/api/dashboard/summary')}}",
                method: "GET",
                dataType: "json",
                success: function(data) {
                    // Tampilkan data summary di elemen HTML
                   
                    $('#activePlanningCount').text(data.activePlanningCount);
                    $('#totalKebutuhanHariIni').text(data.totalKebutuhanHariIni);
                    $('#totalSudahDipplotHariIni').text(data.totalSudahDipplotHariIni);
                    $('#totalBelumDipplotHariIni').text(data.totalBelumDipplotHariIni);

                    const planningList = $('#activePlanningList');
                    planningList.empty(); // Bersihkan dulu

                    data.activePlanning.forEach(item => {
                        const start = new Date(item.start_date);
                        const end = new Date(item.end_date);

                        // Format tanggal
                        const day = ('0' + start.getDate()).slice(-2);
                        const month = ('0' + (start.getMonth() + 1)).slice(-2);
                        const year = start.getFullYear().toString().slice(-2);
                        const dayName = start.toLocaleString('en-US', {
                            weekday: 'short'
                        }); // Mon, Tue, etc

                        const tanggalDisplay = `${day}-${month}-${year}`;

                        const html = `
                    <li class="list-group-item ps-0">
                        <div class="row align-items-center g-3">
                            <div class="col-auto">
                                <div class="avatar-sm p-1 py-2 h-auto bg-light rounded-3 shadow">
                                    <div class="text-center">
                                        <h5 class="mb-0">${day}</h5>
                                        <div class="text-muted">${dayName}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <h5 class="text-muted mt-0 mb-1 fs-13">
                                    ${tanggalDisplay} (${item.group}) - ${item.jumlah_karyawan} Orang
                                </h5>
                                <p class="text-reset fs-14 mb-0">
                                    Shift ${item.shift} - ${item.kode_bagian} - ${item.kode_jabatan}
                                </p>
                            </div>
                        </div>
                    </li>
                    `;

                        planningList.append(html);
                    });

                    // Render ApexCharts grafikRange
                    renderChart(data.grafikRange);

                    allPlanningData = data.activePlanning;
                    renderPlanningPage();

                },
                error: function(err) {
                    console.error('Error loading dashboard summary', err);
                }
            });
        }

        $(document).on('click', '.page-link', function(e) {
            e.preventDefault();
            const page = $(this).data('page');
            const totalPages = Math.ceil(allPlanningData.length / perPage);

            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderPlanningPage();
            }
        });



        // Fungsi untuk render grafik dengan ApexCharts
        function renderChart(grafikRange) {
            // Mapping data untuk series dan kategori
            const categories = grafikRange.map(d => d.tanggal);
            const kebutuhanData = grafikRange.map(d => d.kebutuhan);
            const sudahDipplotData = grafikRange.map(d => d.sudah_dipplot);
            const sisaData = grafikRange.map(d => d.sisa);

            const options = {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                },
                series: [{
                        name: 'Sudah Diplotting',
                        data: sudahDipplotData,
                    },
                    {
                        name: 'Sisa Kebutuhan',
                        data: sisaData,
                    }
                ],
                xaxis: {
                    categories: categories,
                    title: {
                        text: 'Tanggal'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Jumlah Karyawan'
                    },
                    min: 0,
                    forceNiceScale: true,
                },
                legend: {
                    position: 'top',
                },
                colors: ['#34c38f', '#f46a6a'],
                tooltip: {
                    y: {
                        formatter: function(val) {
                            return val + " orang";
                        }
                    }
                }
            };

            // Render chart di div #grafikRange
            if (window.chart) {
                window.chart.updateOptions(options);
            } else {
                window.chart = new ApexCharts(document.querySelector("#grafikRange"), options);
                window.chart.render();
            }
        }


        // Load data awal
        loadDashboardSummary();

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