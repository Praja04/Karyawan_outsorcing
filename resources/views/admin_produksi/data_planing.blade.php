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
                            <label>Group</label>
                            <select name="group" id="edit-group" class="form-control" required place>
                                <option disabled selected>Pilih Group</option>
                                @foreach ($groups as $group)
                                <option value="{{ $group }}">{{ $group }}</option>
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

</div>

<script>
    // Show modal edit
    $('.edit-btn').on('click', function() {
        $('#edit-id').val($(this).data('id'));
        $('#edit-start_date').val($(this).data('start_date'));
        $('#edit-end_date').val($(this).data('end_date'));
        $('#edit-group').val($(this).data('group'));
        $('#edit-jumlah').val($(this).data('jumlah'));
        $('#editPlanningModal').modal('show');
    });

    // Submit update with SweetAlert
    $('#editPlanningForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#edit-id').val();

        Swal.fire({
            title: 'Memperbarui...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.ajax({
            url: "{{url('/supervisor/planning')}}" + "/" + id,
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: res.message,
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    location.reload();
                });
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: xhr.responseJSON.message || 'Update gagal'
                });
            }
        });
    });

    // Delete with SweetAlert
    $('.delete-btn').on('click', function() {
        let id = $(this).data('id');

        Swal.fire({
            title: 'Hapus Planning?',
            text: 'Data tidak bisa dikembalikan setelah dihapus.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "{{url('/supervisor/planning')}}" + "/" + id,
                    method: 'DELETE',
                    data: {
                        _token: '{{ csrf_token() }}'
                    },
                    success: function() {
                        Swal.fire({
                            icon: 'success',
                            title: 'Terhapus!',
                            text: 'Planning berhasil dihapus.',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            location.reload();
                        });
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