@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="h-100">
                    <!-- Header Section -->
                    <div class="row mb-3 pb-1">
                        <div class="col-12">
                            <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                                <div class="flex-grow-1">
                                    <h4 class="fs-16 mb-1">Welcome, {{Session::get('username')}}</h4>
                                    <p class="text-muted mb-0">Here's what's happening with your employee today.</p>
                                </div>
                                <div class="mt-3 mt-lg-0">
                                    <div class="d-flex align-items-center">
                                        <div class="spinner-border spinner-border-sm text-primary me-2" id="loadingSpinner" style="display: none;">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        <span class="text-muted small" id="lastUpdated"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Metrics Cards -->
                    <div class="row">
                        <div class="col-xl-3 col-md-6">
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Total Karyawan</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                                                <span class="counter-value" id="total_karyawan">-</span>
                                            </h4>
                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-warning rounded fs-3">
                                                <i class="bx bx-user-circle"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Planning Active</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                                                <span class="counter-value" id="activePlanningCount">-</span>
                                            </h4>
                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-info rounded fs-3">
                                                <i class="bx bx-calendar"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Total Kebutuhan Hari ini</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                                                <span class="counter-value" id="totalKebutuhanHariIni">-</span>
                                            </h4>
                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-primary rounded fs-3">
                                                <i class="bx bx-target-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6">
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Total Sudah Diplotting Hari Ini</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                                                <span class="counter-value" id="totalSudahDipplotHariIni">-</span>
                                            </h4>
                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-success rounded fs-3">
                                                <i class="bx bx-check-circle"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Filter Section -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title mb-3">Filter Data</h6>
                                    <div class="row g-3">
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
                                                <option value="SEMUA">Semua Group</option>
                                                @foreach (['A', 'B', 'C', 'N'] as $group)
                                                <option value="GRUP {{ $group }}">Group {{ $group }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="col-md-3 d-flex align-items-end">
                                            <button id="applyFilterBtn" class="btn btn-primary w-100">
                                                <i class="ri-filter-line me-1"></i> Terapkan Filter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Planning & Plotting Charts -->
                    <div class="row">
                        @foreach (['A', 'B', 'C', 'N'] as $group)
                        <div class="col-xl-6 mb-4">
                            <div class="card">
                                <div class="card-header border-0 d-flex align-items-center">
                                    <h4 class="card-title mb-0 flex-grow-1">Planning & Plotting - Group {{ $group }}</h4>
                                    <div class="chart-loading" id="planningLoading{{ $group }}" style="display: none;">
                                        <div class="spinner-border spinner-border-sm text-primary"></div>
                                    </div>
                                </div>
                                <div class="card-body p-0 pb-2">
                                    <div id="grafikGroup{{ $group }}" class="w-100 px-3 py-2" style="min-height: 300px;">
                                        <div class="d-flex justify-content-center align-items-center h-100">
                                            <div class="text-center">
                                                <div class="spinner-border text-primary mb-2"></div>
                                                <p class="text-muted">Loading chart...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>

                    <!-- Attendance Summary Charts -->
                    <div class="row">
                        @foreach (['A', 'B', 'C', 'N'] as $group)
                        <div class="col-xl-6 mb-4">
                            <div class="card border-success">
                                <div class="card-header bg-success text-white d-flex align-items-center">
                                    <h4 class="card-title mb-0 flex-grow-1">Summary Kehadiran - Group {{ $group }}</h4>
                                    <div class="chart-loading" id="attendanceLoading{{ $group }}" style="display: none;">
                                        <div class="spinner-border spinner-border-sm text-white"></div>
                                    </div>
                                </div>
                                <div class="card-body p-0 pb-2">
                                    <div id="summaryGroup{{ $group }}" class="w-100 px-3 py-2" style="min-height: 300px;">
                                        <div class="d-flex justify-content-center align-items-center h-100">
                                            <div class="text-center">
                                                <div class="spinner-border text-success mb-2"></div>
                                                <p class="text-muted">Loading attendance chart...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>

                    <!-- Planning Data Table -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card" id="ticketsList">
                                <div class="card-header border-0">
                                    <div class="d-flex align-items-center">
                                        <h5 class="card-title mb-0 flex-grow-1">Data Planning</h5>
                                    </div>
                                </div>
                                <div class="card-body border border-dashed border-end-0 border-start-0">
                                    <div class="row g-3">
                                        <div class="col-xxl-5 col-sm-12">
                                            <div class="search-box">
                                                <input type="text" class="form-control search" id="searchField" placeholder="Cari Planning...">
                                                <i class="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                    <td colspan="10" class="text-center">Belum ada planning dibuat</td>
                                                </tr>
                                                @endforelse
                                            </tbody>
                                        </table>
                                        <nav>
                                            <ul class="pagination justify-content-center mt-3" id="planningPagination"></ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Employee Data Table -->
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
                                    <div class="row g-3 align-items-center">
                                        <div class="col-xxl-5 col-sm-6">
                                            <div class="search-box">
                                                <input type="text" class="form-control" id="searchKaryawan" placeholder="Cari nama, NIK, atau vendor...">
                                                <i class="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                        <div class="col-xxl-2 col-sm-3">
                                            <button type="button" class="btn btn-primary w-100" onclick="filterKaryawan()">
                                                <i class="ri-equalizer-fill me-1 align-bottom"></i> Tampilkan
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body pt-0">
                                    <ul class="nav nav-tabs nav-tabs-custom nav-success mb-3" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active py-2" data-bs-toggle="tab" href="#tabAll" role="tab">🧾 Semua Karyawan</a>
                                        </li>
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="tabAll" role="tabpanel">
                                            <div class="table-responsive table-card">
                                                <table class="table table-nowrap align-middle" id="tabAllTable">
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
                                                        <!-- Dynamic content via JS -->
                                                    </tbody>
                                                </table>
                                                <div id="paginationWrapper" class="mt-3 text-center"></div>
                                                <div class="noresult text-center py-4" style="display:none">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style="width:75px;height:75px">
                                                    </lord-icon>
                                                    <h5 class="mt-2">Data Tidak Ditemukan</h5>
                                                    <p class="text-muted">Silakan periksa kembali pencarian atau filter status.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Status Modal -->
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

<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script>
    $(document).ready(function() {
        let allRows = Array.from($('#ticket-list-data tr'));
        let filteredRows = [...allRows];
        const perPage = 12;
        let currentPage = 1;
        const $tableBody = $('#ticket-list-data');
        const $pagination = $('#planningPagination');

        function renderTable() {
            const totalPages = Math.ceil(filteredRows.length / perPage);
            const start = (currentPage - 1) * perPage;
            const end = start + perPage;
            $tableBody.empty().append(filteredRows.slice(start, end));

            $('.noresult').toggle(filteredRows.length === 0);
            $pagination.empty();

            if (totalPages <= 1) return;

            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = startPage + maxVisiblePages - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            // Tombol ke halaman pertama
            if (startPage > 1) {
                $pagination.append(`
            <li class="page-item">
                <a class="page-link page-btn" href="#" data-page="1">1</a>
            </li>
            <li class="page-item disabled"><span class="page-link">...</span></li>
        `);
            }

            // Nomor halaman aktif
            for (let i = startPage; i <= endPage; i++) {
                $pagination.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link page-btn" href="#" data-page="${i}">${i}</a>
            </li>
        `);
            }

            // Tombol ke halaman terakhir
            if (endPage < totalPages) {
                $pagination.append(`
            <li class="page-item disabled"><span class="page-link">...</span></li>
            <li class="page-item">
                <a class="page-link page-btn" href="#" data-page="${totalPages}">${totalPages}</a>
            </li>
        `);
            }

            // Tombol ← dan →
            $pagination.prepend(`
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link page-btn" href="#" data-page="${currentPage - 1}">←</a>
                </li>
            `);
            $pagination.append(`
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link page-btn" href="#" data-page="${currentPage + 1}">→</a>
                </li>
            `);

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
        // ===========================================
        // GLOBAL VARIABLES & STATE MANAGEMENT
        // ===========================================

        const STATE = {
            charts: {
                planning: {},
                attendance: {}
            },
            data: {
                employees: [],
                plannings: [],
                filteredPlannings: [],
                attendanceSummary: {}
            },
            pagination: {
                planning: {
                    current: 1,
                    perPage: 12
                },
                employee: {
                    current: 1,
                    perPage: 10
                }
            },
            filters: {
                startDate: null,
                endDate: null,
                group: 'SEMUA'
            },
            loading: false
        };

        // ===========================================
        // UTILITY FUNCTIONS
        // ===========================================

        function showLoading(show = true) {
            STATE.loading = show;
            $('#loadingSpinner').toggle(show);
            $('#applyFilterBtn').prop('disabled', show);

            if (show) {
                $('#applyFilterBtn').html('<span class="spinner-border spinner-border-sm me-2"></span>Loading...');
            } else {
                $('#applyFilterBtn').html('<i class="ri-filter-line me-1"></i> Terapkan Filter');
            }
        }

        function showChartLoading(group, chartType, show = true) {
            $(`#${chartType}Loading${group}`).toggle(show);
        }

        function setDefaultDates() {
            const today = new Date();
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);
            const fourDaysLater = new Date(today);
            fourDaysLater.setDate(today.getDate() + 4);

            const startDate = sevenDaysAgo.toISOString().split('T')[0];
            const endDate = fourDaysLater.toISOString().split('T')[0];

            $('#startDateFilter').val(startDate);
            $('#endDateFilter').val(endDate);

            STATE.filters.startDate = startDate;
            STATE.filters.endDate = endDate;
        }

        function updateLastUpdatedTime() {
            const now = new Date();
            $('#lastUpdated').text(`Last updated: ${now.toLocaleTimeString('id-ID')}`);
        }

        function animateCounter(elementId, endValue, duration = 1000) {
            const element = document.getElementById(elementId);
            if (!element) return;

            const startValue = 0;
            const increment = endValue / (duration / 16);
            let currentValue = startValue;

            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= endValue) {
                    currentValue = endValue;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(currentValue);
            }, 16);
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
            });
        }

        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // ===========================================
        // API CALLS
        // ===========================================

        async function loadDashboardData() {
            if (STATE.loading) return;
            showLoading(true);

            try {
                const {
                    startDate,
                    endDate,
                    group
                } = STATE.filters;

                // Format group parameter for API
                let groupParam = group;
                if (group !== 'SEMUA') {
                    // Jika group sudah dalam format "GRUP X", gunakan langsung
                    // Jika tidak, tambahkan "GRUP " prefix
                    groupParam = group.startsWith('GRUP ') ? group : `GRUP ${group}`;
                }

                const params = new URLSearchParams({
                    start_date: startDate,
                    end_date: endDate,
                    group: groupParam
                });

                console.log('Loading dashboard data with params:', Object.fromEntries(params));

                const [dashboardResponse, attendanceResponse] = await Promise.all([
                    fetch(`{{ url('/admin/api/dashboard/summary') }}?${params}`),
                    fetch(`{{ url('/api/attendance-summary') }}?${params}`)
                ]);

                if (!dashboardResponse.ok) {
                    throw new Error(`Dashboard API failed: ${dashboardResponse.status}`);
                }

                const dashboardData = await dashboardResponse.json();
                console.log('Dashboard data received:', dashboardData);

                // Update UI dengan data yang benar-benar dari response
                updateDashboardMetrics(dashboardData);
                await renderPlanningCharts(dashboardData.grafikGroupByTanggalPerGrup || {});

                // Handle attendance data
                if (attendanceResponse.ok) {
                    const attendanceData = await attendanceResponse.json();
                    console.log('Attendance data received:', attendanceData);
                    await renderAttendanceCharts(attendanceData.data || {});
                } else {
                    console.warn('Attendance API failed, rendering empty charts');
                    await renderAttendanceChartsEmpty();
                }

                updateLastUpdatedTime();

                // Show success message if data is empty
                if ((!dashboardData.grafikGroupByTanggalPerGrup || Object.keys(dashboardData.grafikGroupByTanggalPerGrup).length === 0) &&
                    (!attendanceData?.data || Object.keys(attendanceData.data).every(key => attendanceData.data[key].length === 0))) {
                    showInfoNotification('Data tidak ditemukan untuk filter yang dipilih. Coba ubah rentang tanggal atau grup.');
                }

            } catch (error) {
                console.error('Error loading dashboard data:', error);
                showErrorNotification('Gagal memuat data: ' + error.message);
            } finally {
                showLoading(false);
            }
        }

        async function loadEmployeeData() {
            try {
                const response = await fetch("{{ url('/admin/employees') }}");
                if (!response.ok) {
                    throw new Error(`Employee API failed: ${response.status}`);
                }

                const employees = await response.json();
                STATE.data.employees = employees.filter(emp => emp.status === 'aktif');
                renderEmployeeTable(STATE.data.employees);

            } catch (error) {
                console.error('Error loading employee data:', error);
                showErrorNotification('Gagal memuat data karyawan: ' + error.message);
            }
        }

        // ===========================================
        // UI UPDATE FUNCTIONS
        // ===========================================

        function updateDashboardMetrics(data) {
            animateCounter('total_karyawan', data.totalEmployees || 0);
            animateCounter('activePlanningCount', data.activePlanningCount || 0);
            animateCounter('totalKebutuhanHariIni', data.totalKebutuhanHariIni || 0);
            animateCounter('totalSudahDipplotHariIni', data.totalSudahDipplotHariIni || 0);
        }

        async function renderPlanningCharts(grafikData) {
            console.log('Rendering planning charts with data:', grafikData);

            const groups = ['A', 'B', 'C', 'N'];

            // Show loading for all planning charts
            groups.forEach(group => showChartLoading(group, 'planning', true));

            // Jika filter grup spesifik, hanya render grup tersebut
            if (STATE.filters.group !== 'SEMUA') {
                const selectedGroup = STATE.filters.group.replace('GRUP ', '');
                if (groups.includes(selectedGroup)) {
                    // Hide loading untuk grup yang tidak dipilih
                    groups.forEach(group => {
                        if (group !== selectedGroup) {
                            showChartLoading(group, 'planning', false);
                            renderEmptyPlanningChart(group, 'Grup tidak dipilih dalam filter');
                        }
                    });

                    // Render hanya grup yang dipilih
                    const groupKey = `GRUP ${selectedGroup}`;
                    const groupData = grafikData[groupKey] || {};
                    await renderSinglePlanningChart(selectedGroup, groupData);
                    showChartLoading(selectedGroup, 'planning', false);
                    return;
                }
            }

            // Render semua grup jika filter = SEMUA
            for (const group of groups) {
                await new Promise(resolve => setTimeout(resolve, 100));

                const groupKey = `GRUP ${group}`;
                const groupData = grafikData[groupKey] || {};

                await renderSinglePlanningChart(group, groupData);
                showChartLoading(group, 'planning', false);
            }
        }

        function renderEmptyPlanningChart(group, message = 'No planning data available') {
            const chartElement = document.querySelector(`#grafikGroup${group}`);
            if (!chartElement) return;

            chartElement.innerHTML = `
            <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-center">
                    <i class="ri-information-line fs-1 text-muted mb-2"></i>
                    <p class="text-muted">${message}</p>
                </div>
            </div>
        `;
        }

        async function renderSinglePlanningChart(group, groupData) {
            const chartElement = document.querySelector(`#grafikGroup${group}`);
            if (!chartElement) return;

            console.log(`Rendering planning chart for group ${group}:`, groupData);

            const categories = Object.keys(groupData);
            const sudahDipplotData = [];
            const sisaData = [];

            if (categories.length === 0) {
                renderEmptyPlanningChart(group);
                return;
            }

            categories.forEach(tanggal => {
                const entries = groupData[tanggal] || [];
                const totalSudah = entries.reduce((sum, item) => sum + (item?.sudah_dipplot || 0), 0);
                const totalSisa = entries.reduce((sum, item) => sum + (item?.sisa || 0), 0);
                sudahDipplotData.push(totalSudah);
                sisaData.push(totalSisa);
            });

            const options = {
                chart: {
                    type: 'bar',
                    height: 300,
                    stacked: true,
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        }
                    },
                    toolbar: {
                        show: false
                    }
                },
                series: [{
                    name: 'Sudah Diplotting',
                    data: sudahDipplotData,
                    color: '#34c38f'
                }, {
                    name: 'Sisa Kebutuhan',
                    data: sisaData,
                    color: '#f46a6a'
                }],
                xaxis: {
                    categories: categories.map(formatDate),
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Jumlah Karyawan'
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    y: {
                        formatter: val => `${val} orang`
                    }
                },
                grid: {
                    borderColor: '#f1f1f1',
                    strokeDashArray: 3
                }
            };

            // Destroy existing chart if exists
            if (STATE.charts.planning[group]) {
                STATE.charts.planning[group].destroy();
            }

            // Clear container and create new chart
            chartElement.innerHTML = '';
            STATE.charts.planning[group] = new ApexCharts(chartElement, options);
            await STATE.charts.planning[group].render();
        }

        async function renderAttendanceCharts(attendanceData) {
            console.log('Rendering attendance charts with data:', attendanceData);

            const groups = ['A', 'B', 'C', 'N'];

            // Show loading for all attendance charts
            groups.forEach(group => showChartLoading(group, 'attendance', true));

            // Jika filter grup spesifik, hanya render grup tersebut
            if (STATE.filters.group !== 'SEMUA') {
                const selectedGroup = STATE.filters.group.replace('GRUP ', '');
                if (groups.includes(selectedGroup)) {
                    // Hide loading untuk grup yang tidak dipilih
                    groups.forEach(group => {
                        if (group !== selectedGroup) {
                            showChartLoading(group, 'attendance', false);
                            renderEmptyAttendanceChart(group, 'Grup tidak dipilih dalam filter');
                        }
                    });

                    // Render hanya grup yang dipilih
                    const groupKey = `GRUP ${selectedGroup}`;
                    const groupData = attendanceData[groupKey] || [];
                    await renderSingleAttendanceChart(selectedGroup, groupData);
                    showChartLoading(selectedGroup, 'attendance', false);
                    return;
                }
            }

            // Render semua grup jika filter = SEMUA
            for (const group of groups) {
                await new Promise(resolve => setTimeout(resolve, 100));

                const groupKey = `GRUP ${group}`;
                const groupData = attendanceData[groupKey] || [];

                await renderSingleAttendanceChart(group, groupData);
                showChartLoading(group, 'attendance', false);
            }
        }

        function renderEmptyAttendanceChart(group, message = 'No attendance data available') {
            const containerId = `summaryGroup${group}`;
            const container = document.querySelector(`#${containerId}`);
            if (!container) return;

            container.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 250px;">
                <div class="text-center">
                    <i class="ri-information-line fs-1 text-muted mb-2"></i>
                    <p class="text-muted mb-0">${message}</p>
                    <small class="text-muted">Try adjusting your date filters</small>
                </div>
            </div>
        `;
        }

        async function renderSingleAttendanceChart(group, groupData) {
            const containerId = `summaryGroup${group}`;
            const container = document.querySelector(`#${containerId}`);
            if (!container) return;

            console.log(`Rendering attendance chart for group ${group}:`, groupData);

            if (!groupData || groupData.length === 0) {
                renderEmptyAttendanceChart(group);
                return;
            }

            // Process data: group by date and sum values
            const dateMap = {};
            groupData.forEach(item => {
                const date = item.start_date;
                if (!dateMap[date]) {
                    dateMap[date] = {
                        jumlah_karyawan: 0,
                        hadir: 0,
                        tidak_hadir: 0,
                        belum_konfirmasi: 0
                    };
                }

                dateMap[date].jumlah_karyawan += item.jumlah_karyawan || 0;
                dateMap[date].hadir += item.hadir || 0;
                dateMap[date].tidak_hadir += item.tidak_hadir || 0;
                dateMap[date].belum_konfirmasi += item.belum_konfirmasi || 0;
            });

            const categories = Object.keys(dateMap).sort();
            const jumlahKaryawanData = categories.map(date => dateMap[date].jumlah_karyawan);
            const hadirData = categories.map(date => dateMap[date].hadir);
            const tidakHadirData = categories.map(date => dateMap[date].tidak_hadir);
            const belumKonfirmasiData = categories.map(date => dateMap[date].belum_konfirmasi);

            const options = {
                chart: {
                    type: 'bar',
                    height: 350,
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        }
                    },
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: false,
                            zoom: false,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: false
                        }
                    }
                },
                series: [{
                    name: 'Total Karyawan',
                    data: jumlahKaryawanData,
                    color: '#6c757d',
                    type: 'bar'
                }, {
                    name: 'Hadir',
                    data: hadirData,
                    color: '#198754',
                    type: 'bar'
                }, {
                    name: 'Tidak Hadir',
                    data: tidakHadirData,
                    color: '#dc3545',
                    type: 'bar'
                }, {
                    name: 'Belum Konfirmasi',
                    data: belumKonfirmasiData,
                    color: '#ffc107',
                    type: 'bar'
                }],
                xaxis: {
                    categories: categories.map(formatDate),
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Jumlah Karyawan'
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function(val, {
                            seriesIndex,
                            dataPointIndex
                        }) {
                            const date = categories[dataPointIndex];
                            const data = dateMap[date];

                            if (seriesIndex === 0) {
                                return `${val} orang (Total)`;
                            } else {
                                const percentage = data.jumlah_karyawan > 0 ?
                                    ((val / data.jumlah_karyawan) * 100).toFixed(1) : 0;
                                return `${val} orang (${percentage}%)`;
                            }
                        }
                    },
                    x: {
                        formatter: function(val, {
                            dataPointIndex
                        }) {
                            const date = categories[dataPointIndex];
                            return new Date(date).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                        }
                    }
                },
                grid: {
                    borderColor: '#f1f1f1',
                    strokeDashArray: 3
                },
                stroke: {
                    width: [3, 0, 0, 0],
                    curve: 'smooth'
                },
                markers: {
                    size: [6, 0, 0, 0],
                    strokeWidth: 2,
                    fillOpacity: 1,
                    hover: {
                        size: 8
                    }
                }
            };

            // Destroy existing chart
            if (STATE.charts.attendance[group]) {
                STATE.charts.attendance[group].destroy();
            }

            // Clear and create new chart
            container.innerHTML = '';
            STATE.charts.attendance[group] = new ApexCharts(container, options);
            await STATE.charts.attendance[group].render();
        }

        async function renderAttendanceChartsEmpty() {
            const groups = ['A', 'B', 'C', 'N'];

            groups.forEach(group => {
                renderEmptyAttendanceChart(group, 'Attendance data unavailable');
                showChartLoading(group, 'attendance', false);
            });
        }

        // ===========================================
        // ENHANCED PAGINATION FUNCTIONS
        // ===========================================

        function renderEmployeePagination(totalEmployees) {
            const totalPages = Math.ceil(totalEmployees / STATE.pagination.employee.perPage);
            const wrapper = document.getElementById('paginationWrapper');

            if (totalPages <= 1) {
                wrapper.innerHTML = '';
                return;
            }

            const currentPage = STATE.pagination.employee.current;
            let paginationHTML = '<nav><ul class="pagination pagination-sm justify-content-center">';

            // Previous button
            const prevDisabled = currentPage === 1 ? 'disabled' : '';
            paginationHTML += `
                <li class="page-item ${prevDisabled}">
                    <a class="page-link employee-page-btn" href="#" data-page="${currentPage - 1}" title="Previous">
                        <i class="ri-arrow-left-line"></i>
                    </a>
                </li>
            `;

            // First page button
            if (currentPage > 3) {
                paginationHTML += `
                    <li class="page-item">
                        <a class="page-link employee-page-btn" href="#" data-page="1">1</a>
                    </li>
                `;

                // Add ellipsis if there's a gap
                if (currentPage > 4) {
                    paginationHTML += `
                        <li class="page-item disabled">
                            <span class="page-link">...</span>
                        </li>
                    `;
                }
            }

            // Calculate range of pages to show around current page
            const delta = 2; // Number of pages to show on each side of current page
            const rangeStart = Math.max(1, currentPage - delta);
            const rangeEnd = Math.min(totalPages, currentPage + delta);

            // Page numbers around current page
            for (let i = rangeStart; i <= rangeEnd; i++) {
                const active = i === currentPage ? 'active' : '';
                paginationHTML += `
                    <li class="page-item ${active}">
                        <a class="page-link employee-page-btn" href="#" data-page="${i}">${i}</a>
                    </li>
                `;
            }

            // Last page button
            if (currentPage < totalPages - 2) {
                // Add ellipsis if there's a gap
                if (currentPage < totalPages - 3) {
                    paginationHTML += `
                        <li class="page-item disabled">
                            <span class="page-link">...</span>
                        </li>
                    `;
                }

                paginationHTML += `
                    <li class="page-item">
                        <a class="page-link employee-page-btn" href="#" data-page="${totalPages}">${totalPages}</a>
                    </li>
                `;
            }

            // Next button
            const nextDisabled = currentPage === totalPages ? 'disabled' : '';
            paginationHTML += `
                <li class="page-item ${nextDisabled}">
                    <a class="page-link employee-page-btn" href="#" data-page="${currentPage + 1}" title="Next">
                        <i class="ri-arrow-right-line"></i>
                    </a>
                </li>
            `;

            paginationHTML += '</ul></nav>';

            // Add pagination info
            const startIndex = (currentPage - 1) * STATE.pagination.employee.perPage + 1;
            const endIndex = Math.min(currentPage * STATE.pagination.employee.perPage, totalEmployees);

            paginationHTML += `
                <div class="d-flex justify-content-between align-items-center mt-3">
                  
                    <div class="d-flex align-items-center gap-2">
                        <label for="perPageSelect" class="text-muted small mb-0">Show:</label>
                        <select id="perPageSelect" class="form-select form-select-sm" style="width: auto;">
                            <option value="10" ${STATE.pagination.employee.perPage === 10 ? 'selected' : ''}>10</option>
                            <option value="20" ${STATE.pagination.employee.perPage === 20 ? 'selected' : ''}>20</option>
                            <option value="50" ${STATE.pagination.employee.perPage === 50 ? 'selected' : ''}>50</option>
                            <option value="100" ${STATE.pagination.employee.perPage === 100 ? 'selected' : ''}>100</option>
                        </select>
                        <span class="text-muted small">per page</span>
                    </div>
                </div>
            `;

            wrapper.innerHTML = paginationHTML;
        }



        // ===========================================
        // EMPLOYEE TABLE FUNCTIONS
        // ===========================================

        function renderEmployeeTable(employees) {
            const tbody = document.querySelector('#tabAllTable tbody');
            if (!tbody) return;

            if (!employees || employees.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4">Tidak ada data karyawan</td></tr>';
                $('.noresult').show();
                return;
            }

            $('.noresult').hide();

            const startIndex = (STATE.pagination.employee.current - 1) * STATE.pagination.employee.perPage;
            const endIndex = startIndex + STATE.pagination.employee.perPage;
            const pageEmployees = employees.slice(startIndex, endIndex);

            const rows = pageEmployees.map(emp => {
                const statusClass = emp.status === 'aktif' ? 'success' :
                    emp.status === 'terminated' ? 'danger' : 'secondary';

                return `
                <tr class="employee-row" style="opacity: 0; transform: translateY(10px);">
                    <td>${emp.nama_karyawan || '-'}</td>
                    <td>${emp.nama_vendor || '-'}</td>
                    <td>${emp.nik_bas || '-'}</td>
                    <td>${emp.nik_os || '-'}</td>
                    <td>${emp.jenis_kelamin || '-'}</td>
                    <td>${emp.grup || '-'}</td>
                    <td>${emp.kode_bagian || '-'}</td>
                    <td><span class="badge bg-${statusClass}">${emp.status || '-'}</span></td>
                    <td>
                        <div class="btn-group btn-group-sm">
                         <button class="btn btn-info" onclick="location.href='{{ url('/admin/employees') }}/${emp.id}/detail'">
                         <i class="ri-eye-line"></i> Detail
                            </button>

                        </div>
                    </td>
                </tr>
            `;
            }).join('');

            tbody.innerHTML = rows;

            // Animate rows
            setTimeout(() => {
                $('.employee-row').each(function(index) {
                    setTimeout(() => {
                        $(this).css({
                            opacity: '1',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease-in-out'
                        });
                    }, index * 50);
                });
            }, 100);

            renderEmployeePagination(employees.length);
        }

        function filterEmployees() {
            const keyword = $('#searchKaryawan').val().toLowerCase();

            const filtered = STATE.data.employees.filter(emp => {
                return [emp.nama_karyawan, emp.nik_bas, emp.nik_os, emp.nama_vendor]
                    .some(field => (field || '').toLowerCase().includes(keyword));
            });

            STATE.pagination.employee.current = 1;
            renderEmployeeTable(filtered);
        }

        // Quick jump to page function
        function jumpToPage(pageNumber, type = 'employee') {
            const maxPages = type === 'employee' ?
                Math.ceil(STATE.data.employees.length / STATE.pagination.employee.perPage) :
                Math.ceil(STATE.data.filteredPlannings.length / STATE.pagination.planning.perPage);

            if (pageNumber >= 1 && pageNumber <= maxPages) {
                STATE.pagination[type].current = pageNumber;

                if (type === 'employee') {
                    renderEmployeeTable(STATE.data.employees);
                } else {
                    renderPlanningTable();
                }
            }
        }

        // ===========================================
        // NOTIFICATION SYSTEM
        // ===========================================

        function showErrorNotification(message) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                alert('Error: ' + message);
            }
        }

        function showSuccessNotification(message) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: message,
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                alert('Success: ' + message);
            }
        }

        function showInfoNotification(message) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'info',
                    title: 'Info',
                    text: message,
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                alert('Info: ' + message);
            }
        }

        // ===========================================
        // EVENT HANDLERS
        // ===========================================

        // Filter application
        $('#applyFilterBtn').on('click', function(e) {
            e.preventDefault();

            const startDate = $('#startDateFilter').val();
            const endDate = $('#endDateFilter').val();
            const group = $('#groupFilter').val();

            if (!startDate || !endDate) {
                showErrorNotification('Mohon pilih tanggal mulai dan selesai');
                return;
            }

            if (new Date(startDate) > new Date(endDate)) {
                showErrorNotification('Tanggal mulai tidak boleh lebih besar dari tanggal selesai');
                return;
            }

            // Check if date range is too large
            const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
            if (daysDiff > 60) {
                if (!confirm('Range tanggal lebih dari 60 hari. Ini mungkin memerlukan waktu loading yang lama. Lanjutkan?')) {
                    return;
                }
            }

            // Update STATE dengan nilai filter terbaru
            STATE.filters = {
                startDate: startDate,
                endDate: endDate,
                group: group
            };

            console.log('Filters updated:', STATE.filters);

            // Clear existing charts
            Object.keys(STATE.charts.planning).forEach(key => {
                if (STATE.charts.planning[key]) {
                    STATE.charts.planning[key].destroy();
                    STATE.charts.planning[key] = null;
                }
            });

            Object.keys(STATE.charts.attendance).forEach(key => {
                if (STATE.charts.attendance[key]) {
                    STATE.charts.attendance[key].destroy();
                    STATE.charts.attendance[key] = null;
                }
            });

            // Load data baru
            loadDashboardData();
        });

        // Employee search
        $('#searchKaryawan').on('input', debounce(filterEmployees, 300));
        $('#searchKaryawan').on('keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                filterEmployees();
            }
        });

        // Planning search
        $('#searchField').on('input', debounce(function() {
            const keyword = $(this).val().toLowerCase();
            STATE.data.filteredPlannings = STATE.data.plannings.filter(plan => {
                return Object.values(plan).some(value =>
                    (value || '').toString().toLowerCase().includes(keyword)
                );
            });
            STATE.pagination.planning = {
                current: 1,
                perPage: 10
            };
            renderPlanningTable();
        }, 300));

        // Enhanced pagination handlers
        $(document).on('click', '.employee-page-btn', function(e) {
            e.preventDefault();
            const page = parseInt($(this).data('page'));
            if (page >= 1 && page <= Math.ceil(STATE.data.employees.length / STATE.pagination.employee.perPage)) {
                STATE.pagination.employee.current = page;
                renderEmployeeTable(STATE.data.employees);
                // Smooth scroll to top of table
                $('html, body').animate({
                    scrollTop: $("#tabAllTable").offset().top - 100
                }, 300);
            }
        });

        $(document).on('click', '.planning-page-btn', function(e) {
            e.preventDefault();
            const page = parseInt($(this).data('page'));
            if (page >= 1 && page <= Math.ceil(STATE.data.filteredPlannings.length / STATE.pagination.planning.perPage)) {
                STATE.pagination.planning.current = page;
                renderPlanningTable();
                // Smooth scroll to top of planning table
                if ($('#planningTable').length) {
                    $('html, body').animate({
                        scrollTop: $("#planningTable").offset().top - 100
                    }, 300);
                }
            }
        });

        // Handle items per page change
        $(document).on('change', '#perPageSelect', function() {
            const newPerPage = parseInt($(this).val());
            STATE.pagination.employee.perPage = newPerPage;
            STATE.pagination.employee.current = 1; // Reset to first page
            renderEmployeeTable(STATE.data.employees);
        });

        // Add keyboard navigation for pagination
        $(document).on('keydown', function(e) {
            // Only handle pagination shortcuts when not typing in input fields
            if ($('input:focus, textarea:focus, select:focus').length > 0) {
                return;
            }

            const currentPage = STATE.pagination.employee.current;
            const maxPages = Math.ceil(STATE.data.employees.length / STATE.pagination.employee.perPage);

            // Arrow keys for pagination navigation
            if (e.ctrlKey) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (currentPage > 1) {
                            jumpToPage(currentPage - 1);
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (currentPage < maxPages) {
                            jumpToPage(currentPage + 1);
                        }
                        break;
                    case 'Home':
                        e.preventDefault();
                        jumpToPage(1);
                        break;
                    case 'End':
                        e.preventDefault();
                        jumpToPage(maxPages);
                        break;
                }
            }
        });

        // Status change modal
        $(document).on('click', '.btn-ubah-status', function() {
            const id = $(this).data('id');
            const nama = $(this).data('nama');

            $('#statusEmployeeId').val(id);
            $('#newStatus').val('');
            $('#statusReason').val('');
            $('#reasonWrapper').hide();
            $('#statusLabel').text(`Ubah Status: ${nama}`);
            $('#statusModal').modal('show');
        });

        $('#newStatus').on('change', function() {
            const value = $(this).val();
            if (value === 'non aktif' || value === 'terminated') {
                $('#reasonWrapper').slideDown();
            } else {
                $('#reasonWrapper').slideUp();
                $('#statusReason').val('');
            }
        });

        // Status form submission
        $('#statusForm').on('submit', async function(e) {
            e.preventDefault();

            const id = $('#statusEmployeeId').val();
            const status = $('#newStatus').val();
            const reason = $('#statusReason').val().trim();

            if (!status) {
                showErrorNotification('Pilih status terlebih dahulu');
                return;
            }

            if ((status === 'non aktif' || status === 'terminated') && !reason) {
                showErrorNotification('Alasan perubahan status wajib diisi');
                return;
            }

            try {
                const response = await fetch(`/admin/update/status/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    body: JSON.stringify({
                        new_status: status,
                        reason: reason
                    })
                });

                if (response.ok) {
                    showSuccessNotification('Status karyawan berhasil diupdate');
                    $('#statusModal').modal('hide');
                    await loadEmployeeData();
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Failed to update status');
                }
            } catch (error) {
                console.error('Error updating employee status:', error);
                showErrorNotification('Terjadi kesalahan saat mengubah status: ' + error.message);
            }
        });

        // Quick pagination jumper
        $(document).on('click', '.quick-jump-btn', function() {
            const maxPages = Math.ceil(STATE.data.employees.length / STATE.pagination.employee.perPage);

            Swal.fire({
                title: 'Jump to Page',
                html: `<input type="number" id="jumpPageInput" class="swal2-input" placeholder="Enter page number" min="1" max="${maxPages}" value="${STATE.pagination.employee.current}">`,
                showCancelButton: true,
                confirmButtonText: 'Jump',
                preConfirm: () => {
                    const page = parseInt(document.getElementById('jumpPageInput').value);
                    if (page < 1 || page > maxPages) {
                        Swal.showValidationMessage(`Page must be between 1 and ${maxPages}`);
                        return false;
                    }
                    return page;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    jumpToPage(result.value);
                }
            });
        });

        // ===========================================
        // INITIALIZATION
        // ===========================================

        function initialize() {
            console.log('Initializing dashboard...');

            // Set default dates
            setDefaultDates();

            // Load initial data
            loadDashboardData();
            loadEmployeeData();

            // Set up automatic refresh every 5 minutes
            setInterval(() => {
                if (!STATE.loading) {
                    console.log('Auto-refreshing dashboard data...');
                    loadDashboardData();
                }
            }, 300000);

            // Add pagination tips tooltip
            $('[data-bs-toggle="tooltip"]').tooltip();

            console.log('Dashboard initialized successfully');
        }

        // Start the application
        initialize();

        // Expose debug function to global scope for testing
        window.debugDashboard = function() {
            console.log('Current STATE:', STATE);
            console.log('Filter values:', {
                startDate: $('#startDateFilter').val(),
                endDate: $('#endDateFilter').val(),
                group: $('#groupFilter').val()
            });
            console.log('API URLs that would be called:');
            const params = new URLSearchParams({
                start_date: STATE.filters.startDate,
                end_date: STATE.filters.endDate,
                group: STATE.filters.group !== 'SEMUA' ?
                    (STATE.filters.group.startsWith('GRUP ') ? STATE.filters.group : `GRUP ${STATE.filters.group}`) : STATE.filters.group
            });
            console.log('Dashboard URL:', `{{ url('/admin/api/dashboard/summary') }}?${params}`);
            console.log('Attendance URL:', `{{ url('/api/attendance-summary') }}?${params}`);
        };

        // Expose pagination utility functions globally
        window.dashboardUtils = {
            jumpToPage: jumpToPage,
            resetPagination: () => {
                STATE.pagination.employee.current = 1;
                STATE.pagination.planning.current = 1;
                renderEmployeeTable(STATE.data.employees);
            },
            refreshData: () => {
                loadDashboardData();
                loadEmployeeData();
            }
        };
    });
</script>
@endsection