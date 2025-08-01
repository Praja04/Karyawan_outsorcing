@extends('layout')

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
                                                <h1>Planning Karyawan Outsorcing </h1>
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

        <div class="row">
            <div class="col-lg-12">
                <div class="card" id="ticketsList">
                    <div class="card-header border-0">
                        <div class="d-flex align-items-center">
                            <h5 class="card-title mb-0 flex-grow-1">Data Planning</h5>
                            <div class="flex-shrink-0">
                                <div class="d-flex flex-wrap gap-2">
                                    <a href="{{ route('admin_produksi.planning.create') }}" class="btn btn-primary mb-3">+ Buat Planning Baru</a>

                                    <a href="{{ route('planning.template') }}" class="btn btn-success mb-3">
                                        📥 Download Template Excel
                                    </a>

                                    <button type="button" class="btn btn-info mb-3" data-bs-toggle="modal" data-bs-target="#uploadExcelModal">
                                        📤 Upload Excel
                                    </button>
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
                                            <a href="{{ route('admin_produksi.plotting.show', $plan->id) }}" class="btn btn-info btn-sm">
                                                View
                                            </a>
                                            <button class="btn btn-warning btn-sm edit-btn" data-id="{{ $plan->id }}" data-start_date="{{ $plan->start_date }}" data-end_date="{{ $plan->end_date }}" data-group="{{ $plan->group }}" data-jumlah="{{ $plan->jumlah_karyawan }}">
                                                Edit
                                            </button>
                                            <button class="btn btn-danger btn-sm delete-btn" data-id="{{ $plan->id }}">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="5" class="text-center">Belum ada planning dibuat</td>
                                    </tr>
                                    @endforelse
                                </tbody>
                            </table>
                            <ul class="pagination listjs-pagination mb-0" id="planningPagination"></ul>
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

    </div>


    <!-- Modal Edit Planning -->
    <div class="modal fade" id="editPlanningModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <form id="editPlanningForm">
                @csrf
                @method('PUT')
                <input type="hidden" name="id" id="edit-id">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Planning</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label>Tanggal Mulai</label>
                            <input type="date" name="start_date" id="edit-start_date" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label>Tanggal Selesai</label>
                            <input type="date" name="end_date" id="edit-end_date" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="shift" class="form-label">Shift</label>
                            <select name="shift" class="form-control" required>
                                <option value="">-- Pilih Shift --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>

                            </select>
                        </div>
                        <div class="mb-3">
                            <label>Group</label>
                            <select name="group" id="edit-group" class="form-control" required place>
                                <option disabled selected>Pilih Group</option>
                                @foreach ($groups as $group)
                                <option value="{{ $group }}">{{ $group }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label>Kode Jabatan</label>
                            <select name="kode_jabatan" id="edit-jabatan" class="form-control" required place>
                                <option disabled selected>Pilih Jabatan</option>
                                @foreach ($kodeJabatans as $jabatan)
                                <option value="{{ $jabatan }}">{{ $jabatan }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label>Kode Bagian</label>
                            <select name="kode_bagian" id="edit-bagian" class="form-control" required place>
                                <option disabled selected>Pilih Bagian</option>
                                @foreach ($kodeBagians as $bagian)
                                <option value="{{ $bagian }}">{{ $bagian }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label>Jumlah Karyawan</label>
                            <input type="number" name="jumlah_karyawan" id="edit-jumlah" class="form-control" min="1" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Update</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal fade" id="uploadExcelModal" tabindex="-1" aria-labelledby="uploadExcelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <form id="uploadExcelForm" enctype="multipart/form-data">
                @csrf
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Upload Excel Perencanaan</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="file" name="planning_excel" accept=".xlsx,.xls" class="form-control" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-success">Upload Sekarang</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#uploadExcelForm').on('submit', function(e) {
        e.preventDefault();

        let formData = new FormData(this);

        Swal.fire({
            title: 'Mengunggah data...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.ajax({
            url: "{{ route('admin_produksi.planning.import') }}",
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data planning berhasil diunggah.',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => location.reload());
            },
            error: function(xhr) {
                let errorMsg = 'Terjadi kesalahan saat upload.';
                if (xhr.responseJSON && xhr.responseJSON.errors) {
                    errorMsg = Object.values(xhr.responseJSON.errors).flat().join('\n');
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: errorMsg
                });
            }
        });
    });


    // Delegated handler untuk tombol Edit
    $(document).on('click', '.edit-btn', function() {
        const button = $(this);
        $('#edit-id').val(button.data('id'));
        $('#edit-start_date').val(button.data('start_date'));
        $('#edit-end_date').val(button.data('end_date'));
        $('#edit-group').val(button.data('group'));
        $('#edit-jumlah').val(button.data('jumlah'));

        $('#editPlanningModal').modal('show');
    });

    // Submit edit form dengan feedback SweetAlert
    $('#editPlanningForm').on('submit', function(e) {
        e.preventDefault();
        const id = $('#edit-id').val();

        Swal.fire({
            title: 'Memperbarui...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.ajax({
            url: "{{url('/supervisor/planning')}}" + '/' + id,
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: res.message,
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => location.reload());
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: xhr.responseJSON?.message || 'Gagal memperbarui data.'
                });
            }
        });
    });

    // Delegated handler untuk tombol Delete
    $(document).on('click', '.delete-btn', function() {
        const id = $(this).data('id');

        Swal.fire({
            title: 'Hapus Planning?',
            text: 'Data tidak dapat dikembalikan setelah dihapus.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "{{url('/supervisor/planning')}}" + '/' + id,
                    method: 'DELETE',
                    success: function() {
                        Swal.fire({
                            icon: 'success',
                            title: 'Terhapus!',
                            text: 'Planning berhasil dihapus.',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => location.reload());
                    },
                    error: function() {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal!',
                            text: 'Gagal menghapus planning.'
                        });
                    }
                });
            }
        });
    });
</script>
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

            let buttons = [];

            buttons.push(`
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link page-btn" href="#" data-page="${currentPage - 1}">Previous</a>
                </li>
            `);

            for (let i = 1; i <= totalPages; i++) {
                buttons.push(`
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link page-btn" href="#" data-page="${i}">${i}</a>
                    </li>
                `);
            }

            buttons.push(`
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link page-btn" href="#" data-page="${currentPage + 1}">Next</a>
                </li>
            `);

            $pagination.html(buttons.join(''));

            $('.page-btn').click(function(e) {
                e.preventDefault();
                const page = Number($(this).data('page'));
                if (page >= 1 && page <= totalPages) {
                    currentPage = page;
                    renderTable();
                }
            });
        }

        $('.search').on('keyup', function() {
            const keyword = $(this).val().toLowerCase();
            filteredRows = allRows.filter(row => $(row).text().toLowerCase().includes(keyword));
            currentPage = 1;
            renderTable();
        });

        renderTable();
    });
</script>
@endsection