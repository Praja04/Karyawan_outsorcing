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
                        <div class="col-xl-3 col-md-6">
                            <!-- card -->
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Total Karyawan</p>
                                        </div>

                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" id="total_karyawan"></span> </h4>

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

                        <div class="col-xl-3 col-md-6">
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

                        <div class="col-xl-3 col-md-6">
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

                        <div class="col-xl-3 col-md-6">
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

                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label for="startDateFilter" class="form-label">Tanggal Mulai</label>
                            <input type="date" id="startDateFilter" class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label for="endDateFilter" class="form-label">Tanggal Selesai</label>
                            <input type="date" id="endDateFilter" class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label for="groupFilter" class="form-label">Pilih Group</label>
                            <select id="groupFilter" class="form-select">
                                <option value="ALL">Semua Group</option>
                                @foreach (['A', 'B', 'C', 'N'] as $group)
                                <option value="GROUP {{ $group }}">Group {{ $group }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-3 d-flex align-items-end">
                            <button id="applyFilterBtn" class="btn btn-primary w-100">Terapkan Filter</button>
                        </div>
                    </div>

                    <div class="row">
                        @foreach (['A', 'B', 'C', 'N'] as $group)
                        <div class="col-xl-6 mb-4">
                            <div class="card">
                                <div class="card-header border-0 d-flex align-items-center">
                                    <h4 class="card-title mb-0 flex-grow-1">Planning & Plotting - Group {{ $group }}</h4>
                                </div>
                                <div class="card-body p-0 pb-2">
                                    <div id="grafikGroup{{ $group }}" class="w-100 px-3 py-2"></div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>

                    <div class="row">
                        <div class="col-xl-5 d-none" aria-hidden="true">
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
                                            <a href="{{ route('planning.detail', $plan->id) }}" class="btn btn-info btn-sm">
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
                            <nav>
                                <ul class="pagination justify-content-center mt-3" id="planningPagination"></ul>
                            </nav>
                            <div class="noresult" style="display: none">
                                <div class="text-center">
                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px">
                                    </lord-icon>
                                    <h5 class="mt-2">Sorry! No Result Found</h5>
                                    <!-- <p class="text-muted mb-0">We've searched more than 150+ Tickets We did not find any Tickets for you search.</p> -->
                                </div>
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


        <div class="row">
            <div class="col-lg-12">
                <div class="card" id="employeeCard">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col-sm">
                                <h5 class="card-title mb-0">Data Karyawan Outsourcing</h5>
                            </div>
                        </div>
                    </div>

                    <div class="card-body border-top">
                        <form>
                            <div class="row g-3 align-items-center">
                                <div class="col-xxl-5 col-sm-6">
                                    <div class="search-box">
                                        <input type="text" class="form-control" id="searchKaryawan" placeholder="Cari nama, NIK, atau vendor...">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-sm-4 d-none" aria-hidden="true">
                                    <select class="form-select" id="filterStatus">
                                        <option value="">Filter Status</option>
                                        <option value="all" selected>Semua</option>
                                        <option value="aktif">Aktif</option>
                                        <option value="non aktif">Non Aktif</option>
                                        <option value="terminated">Terminated</option>
                                    </select>
                                </div>

                                <div class="col-xxl-2 col-sm-3">
                                    <button type="button" class="btn btn-primary w-100" onclick="filterKaryawan()">
                                        <i class="ri-equalizer-fill me-1 align-bottom"></i> Tampilkan
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="card-body pt-0">
                        <ul class="nav nav-tabs nav-tabs-custom nav-success mb-3" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active py-2" data-bs-toggle="tab" href="#tabAll" role="tab">🧾 Semua Karyawan</a>
                            </li>
                            <!-- <li class="nav-item">
                                <a class="nav-link py-2" data-bs-toggle="tab" href="#tabKMJ" role="tab">🏢 Mitra KMJ</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link py-2" data-bs-toggle="tab" href="#tabFortuna" role="tab">🚚 Mitra Fortuna</a>
                            </li> -->
                        </ul>

                        <div class="tab-content">
                            @foreach (['tabAll' => 'Semua Karyawan', 'tabKMJ' => 'Mitra KMJ', 'tabFortuna' => 'Mitra Fortuna'] as $tabId => $label)
                            <div class="tab-pane fade {{ $loop->first ? 'show active' : '' }}" id="{{ $tabId }}" role="tabpanel">
                                <div class="table-responsive table-card">
                                    <table class="table table-nowrap align-middle" id="{{ $tabId }}Table">
                                        <thead class="table-light text-center text-uppercase">
                                            <tr>
                                                <th>Nama</th>
                                                <th>Mitra</th>
                                                <th>NIK BAS</th>
                                                <th>NIK OS</th>
                                                <th>Jenis Kelamin</th>
                                                <th>Grup</th>
                                                <th>Bagian</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="list text-center">
                                            <!-- Baris dinamis via JS -->
                                        </tbody>
                                    </table>
                                    <div id="paginationWrapper" class="mt-3 text-center"></div>
                                    <div class="noresult text-center py-4" style="display:none">
                                        <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style="width:75px;height:75px">
                                        </lord-icon>
                                        <h5 class="mt-2">Data Tidak Ditemukan</h5>
                                        <p class="text-muted">Silakan periksa kembali pencarian atau filter status.</p>
                                    </div>
                                    <div class="modal fade" id="statusModal" tabindex="-1" aria-labelledby="statusLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-sm">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="statusLabel">Ubah Status Karyawan</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form id="statusForm">
                                                        <input type="hidden" name="employee_id" id="statusEmployeeId">
                                                        <div class="mb-3">
                                                            <label for="newStatus" class="form-label">Pilih Status</label>
                                                            <select class="form-select" name="new_status" id="newStatus" required>
                                                                <option value="">-- Pilih Status --</option>
                                                                <option value="aktif">Aktif</option>
                                                                <option value="non aktif">Non Aktif</option>
                                                                <option value="terminated">Terminated</option>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3" id="reasonWrapper" style="display:none;">
                                                            <label for="statusReason" class="form-label">Alasan Perubahan Status</label>
                                                            <textarea class="form-control" name="reason" id="statusReason" maxlength="200" placeholder="Contoh: kontrak berakhir, resign, pelanggaran, dll..."></textarea>
                                                        </div>

                                                        <div class="text-end">
                                                            <button type="submit" class="btn btn-success">Simpan</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- container-fluid -->
</div>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script>
    $(document).ready(function() {
        let allRows = Array.from($('#ticket-list-data tr'));
        let filteredRows = [...allRows];
        const perPage = 10;
        let currentPage = 1;
        const $tableBody = $('#ticket-list-data');
        const $pagination = $('#planningPagination');

        function renderTable() {
            const totalPages = Math.ceil(filteredRows.length / perPage);
            const start = (currentPage - 1) * perPage;
            const end = start + perPage;
            $tableBody.empty().append(filteredRows.slice(start, end));

            // Toggle Noresult
            $('.noresult').toggle(filteredRows.length === 0);

            // Render ulang pagination
            $pagination.empty();

            if (totalPages <= 1) return;

            // Tombol ←
            $pagination.append(`
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link page-btn" href="#" data-page="${currentPage - 1}">←</a>
                </li>
            `);

            // Nomor halaman
            for (let i = 1; i <= totalPages; i++) {
                $pagination.append(`
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link page-btn" href="#" data-page="${i}">${i}</a>
                    </li>
                `);
            }

            // Tombol →
            $pagination.append(`
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link page-btn" href="#" data-page="${currentPage + 1}">→</a>
                </li>
            `);

            // Event pagination
            $('.page-btn').click(function(e) {
                e.preventDefault();
                const target = Number($(this).data('page'));
                if (target >= 1 && target <= totalPages) {
                    currentPage = target;
                    renderTable();
                }
            });
        }

        // Pencarian
        $('.search').on('keyup', function() {
            const keyword = $(this).val().toLowerCase();
            filteredRows = allRows.filter(row => $(row).text().toLowerCase().includes(keyword));
            currentPage = 1;
            renderTable();
        });

        // Render awal
        renderTable();
    });
</script>
<script>
    $(document).ready(function() {
        // Fungsi untuk load data dari API
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        let currentPage = 1;
        let perPage = 10; // ← Ubah ini untuk jumlah data per halaman
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

            if (totalPages <= 1) return; // tidak perlu pagination kalau datanya sedikit

            const buttons = [];

            // ← prev
            buttons.push(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="page-link pagination-btn" data-page="${currentPage - 1}">←</a>
        </li>
    `);

            // nomor halaman
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a href="#" class="page-link pagination-btn" data-page="${i}">${i}</a>
            </li>
        `);
            }

            // → next
            buttons.push(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a href="#" class="page-link pagination-btn" data-page="${currentPage + 1}">→</a>
        </li>
    `);

            pagination.html(buttons.join(''));

            // Event klik pagination
            $('.pagination-btn').on('click', function(e) {
                e.preventDefault();
                const targetPage = Number($(this).data('page'));
                if (targetPage >= 1 && targetPage <= totalPages) {
                    currentPage = targetPage;
                    renderPlanningPage();
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

        // Load data awal
        loadDashboardSummary();


    });

    function loadDashboardSummary() {
        const startDate = $('#startDateFilter').val();
        const endDate = $('#endDateFilter').val();
        const group = $('#groupFilter').val();

        $.ajax({
            url: "{{ url('/admin/api/dashboard/summary') }}",
            method: "GET",
            data: {
                start_date: startDate,
                end_date: endDate,
                group: group
            },
            dataType: "json",
            success: function(data) {
                // 🧮 Update summary metrics
                $('#total_karyawan').text(data.totalEmployees);
                $('#activePlanningCount').text(data.activePlanningCount);
                $('#totalKebutuhanHariIni').text(data.totalKebutuhanHariIni);
                $('#totalSudahDipplotHariIni').text(data.totalSudahDipplotHariIni);
                $('#totalBelumDipplotHariIni').text(data.totalBelumDipplotHariIni);

                // 📋 Update planning list
                const planningList = $('#activePlanningList');
                planningList.empty();

                data.todaySummary.forEach(function(item) {
                    const start = new Date(item.start_date);
                    const day = String(start.getDate()).padStart(2, '0');
                    const month = String(start.getMonth() + 1).padStart(2, '0');
                    const year = String(start.getFullYear()).slice(-2);
                    const dayName = start.toLocaleString('id-ID', {
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
                </li>`;
                    planningList.append(html);
                });

                // 📊 Update charts
                renderGroupCharts(data.grafikGroupByTanggalPerGrup);
            },
            error: function(err) {
                console.error('Gagal memuat ringkasan dashboard:', err);
            }
        });
    }

    function renderGroupCharts(grafikGroupByTanggalPerGrup = {}) {
        const groupNames = ['A', 'B', 'C', 'N'];

        groupNames.forEach(function(group) {
            const groupKey = `GRUP ${group}`;
            const groupData = grafikGroupByTanggalPerGrup[groupKey] || {}; // Default ke object kosong

            const categories = Object.keys(groupData);
            const sudahDipplotData = [];
            const sisaData = [];

            if (categories.length === 0) {
                // Tetap render chart dengan dummy data jika grup belum ada
                categories.push('Kosong');
                sudahDipplotData.push(0);
                sisaData.push(0);
            } else {
                categories.forEach(function(tanggal) {
                    const entries = groupData[tanggal] || [];

                    const totalSudah = entries.reduce((sum, item) => sum + (item?.sudah_dipplot || 0), 0);
                    const totalSisa = entries.reduce((sum, item) => sum + (item?.sisa || 0), 0);

                    sudahDipplotData.push(totalSudah);
                    sisaData.push(totalSisa);
                });
            }

            const chartElement = document.querySelector(`#grafikGroup${group}`);
            if (grafikGroupCharts[group]) {
                grafikGroupCharts[group].updateOptions({
                    series: [{
                            name: 'Sudah Diplotting',
                            data: sudahDipplotData
                        },
                        {
                            name: 'Sisa Kebutuhan',
                            data: sisaData
                        }
                    ],
                    xaxis: {
                        categories: categories
                    }
                });
            } else {
                const options = {
                    chart: {
                        type: 'bar',
                        height: 300,
                        stacked: true
                    },
                    series: [{
                            name: 'Sudah Diplotting',
                            data: sudahDipplotData
                        },
                        {
                            name: 'Sisa Kebutuhan',
                            data: sisaData
                        }
                    ],
                    xaxis: {
                        categories: categories
                    },
                    yaxis: {
                        title: {
                            text: 'Jumlah Karyawan'
                        }
                    },
                    legend: {
                        position: 'top'
                    },
                    colors: ['#34c38f', '#f46a6a'],
                    tooltip: {
                        y: {
                            formatter: val => `${val} orang`
                        }
                    }
                };

                grafikGroupCharts[group] = new ApexCharts(chartElement, options);
                grafikGroupCharts[group].render();
            }
        });
    }

    let grafikGroupCharts = {};

    $('#applyFilterBtn').on('click', function() {
        loadDashboardSummary();
    });
</script>
<script>
    let tables = {
        tabAllTable: [],
        tabKMJTable: [],
        tabFortunaTable: []
    };
    let currentPage = 1; // Move currentPage outside of renderKaryawan

    $(document).ready(function() {
        loadKaryawanData();

        // Trigger search saat enter ditekan
        $('#searchKaryawan').on('keypress', function(e) {
            if (e.which === 13) filterKaryawan();
        });

        $('.nav-link[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
            const targetTab = $(e.target).attr('href').replace('#', '') + 'Table';
            let dataToRender = [];

            if (targetTab === 'tabAllTable') {
                dataToRender = tables.tabAllTable;
            } else if (targetTab === 'tabKMJTable') {
                dataToRender = tables.tabKMJTable;
            } else if (targetTab === 'tabFortunaTable') {
                dataToRender = tables.tabFortunaTable;
            }

            paginate(targetTab, dataToRender);
        });
    });

    $('#newStatus').on('change', function() {
        const val = $(this).val();
        if (val === 'non aktif' || val === 'terminated') {
            $('#reasonWrapper').slideDown();
        } else {
            $('#reasonWrapper').slideUp();
            $('#statusReason').val('');
        }
    });

    function loadKaryawanData() {
        $.getJSON('{{ url("admin/employees") }}', function(data) {
            const activeKaryawan = data.filter(function(karyawan) {
                return karyawan.status === 'aktif';
            });

            window.allKaryawanData = activeKaryawan; // simpan hanya yang aktif
            renderKaryawan(activeKaryawan); // kirim hanya yang aktif
        });

    }

    $(document).on('click', '.btn-ubah-status', function() {
        const id = $(this).data('id');
        const nama = $(this).data('nama');

        $('#statusEmployeeId').val(id);
        $('#newStatus').val('');
        $('#statusLabel').text(`Ubah Status: ${nama}`);
        $('#statusModal').modal('show');
    });

    $('#statusForm').submit(function(e) {
        e.preventDefault();
        const id = $('#statusEmployeeId').val();
        const status = $('#newStatus').val();

        if (!status) return Swal.fire('Oops', 'Pilih status terlebih dahulu.', 'warning');

        $.ajax({
            url: "{{url('/admin/update/status')}}/" + id,
            method: 'POST',
            data: {
                new_status: status,
                reason: $('#statusReason').val().trim(), // kirim alasan
                _token: '{{ csrf_token() }}'
            },
            success: function(res) {
                Swal.fire('Berhasil', 'Status karyawan berhasil diupdate.', 'success');
                $('#statusModal').modal('hide');
                loadKaryawanData();
            },
            error: function() {
                Swal.fire('Gagal', 'Terjadi kesalahan saat mengubah status.', 'error');
            }
        });
    });

    function filterKaryawan() {
        const keyword = $('#searchKaryawan').val().toLowerCase();
        const status = $('#filterStatus').val();

        const filtered = window.allKaryawanData.filter(item => {
            const matchText = [
                item.nama_karyawan, item.nik_bas, item.nik_os, item.nama_vendor
            ].some(val => val?.toLowerCase().includes(keyword));

            const matchStatus = (status === 'all' || status === '') ? true : item.status?.toLowerCase() === status;

            return matchText && matchStatus;
        });

        renderKaryawan(filtered);
    }

    function paginate(tableId, rows) {
        const itemsPerPage = 20;
        const totalPages = Math.ceil(rows.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentRows = rows.slice(start, end);

        $(`#${tableId} tbody`).html(currentRows.join(''));

        const pagination = [];
        for (let i = 1; i <= totalPages; i++) {
            pagination.push(`<button class="page-btn btn btn-sm btn-outline-primary mx-1 ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`);
        }

        $('#paginationWrapper').html(pagination.join(''));

        $('.page-btn').on('click', function() {
            currentPage = Number($(this).data('page'));
            paginate(tableId, rows);
        });
    }

    function renderKaryawan(data) {
        tables = {
            tabAllTable: [],
            tabKMJTable: [],
            tabFortunaTable: []
        };
        currentPage = 1; // Reset currentPage when rendering new data

        if (!data.length) {
            $('.noresult').show();
            $('#tabAllTable tbody, #tabKMJTable tbody, #tabFortunaTable tbody').empty();
            $('#paginationWrapper').empty();
            return;
        }

        $('.noresult').hide();

        data.forEach(item => {
            const row = `
            <tr>
                <td>${item.nama_karyawan ?? '-'}</td>
                <td>${item.nama_vendor ?? '-'}</td>
                <td>${item.nik_bas ?? '-'}</td>
                <td>${item.nik_os ?? '-'}</td>
                <td>${item.jenis_kelamin ?? '-'}</td>
                <td>${item.grup ?? '-'}</td>
                <td>${item.kode_bagian ?? '-'}</td>
                <td><span class="badge bg-${item.status === 'aktif' ? 'success' : item.status === 'terminated' ? 'danger' : 'secondary'}">${item.status ?? '-'}</span></td>
                <td>
                  <button class="btn btn-sm btn-info" onclick="location.href='{{ url('admin/employees') }}/'+${item.id}+'/detail'">
                    Lihat Data
                   </button>  
                </td>
            </tr>
        `;
            tables.tabAllTable.push(row);
            if ((item.nama_vendor || '').toLowerCase().includes('kmj')) tables.tabKMJTable.push(row);
            if ((item.nama_vendor || '').toLowerCase().includes('fortuna')) tables.tabFortunaTable.push(row);
        });

        paginate('tabAllTable', tables.tabAllTable); // You can adapt this for other tabs as well
    }
</script>
@endsection