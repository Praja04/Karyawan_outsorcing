@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row gx-lg-5">
                            <div class="col-xl-12">
                                <div class="mt-xl-0 mt-5">
                                    <div class="d-flex">
                                        <div class="flex-grow-1">
                                            <h4>Plotting Karyawan untuk Group : {{ $planning->group }}</h4>
                                            <div class="hstack gap-3 flex-wrap">
                                                <div><a href="#" class="text-primary d-block">{{Session::get('username')}}</a></div>
                                                <div class="vr"></div>

                                                <div class="text-muted">Tanggal Plotting : <span class="text-body fw-medium">{{ $planning->start_date }} - {{ $planning->end_date }}</span></div>

                                            </div>
                                        </div>

                                    </div>



                                    <div class="row mt-4">
                                        <div class="col-lg-4 col-sm-6">
                                            <div class="p-2 border border-dashed rounded">
                                                <div class="d-flex align-items-center">
                                                    <div class="avatar-sm me-2">
                                                        <div class="avatar-title rounded bg-transparent text-success fs-24">
                                                            <i class="ri-drop-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1">Jumlah Karyawan Yang Dibutuhkan:</p>
                                                        <h5 class="mb-0">{{ $planning->jumlah_karyawan }}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end col -->
                                        <div class="col-lg-4 col-sm-6">
                                            <div class="p-2 border border-dashed rounded">
                                                <div class="d-flex align-items-center">
                                                    <div class="avatar-sm me-2">
                                                        <div class="avatar-title rounded bg-transparent text-success fs-24">
                                                            <i class="ri-drop-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1">Shift:</p>
                                                        <h5 class="mb-0">{{ $planning->shift }}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end row -->
                </div>
                <!-- end card body -->
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->

        <!-- end row -->
        <div class="row">

            <div class="col-lg-12 mb-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <h5 class="card-title mb-0 flex-grow-1">Group: </h5>
                        <span class="badge bg-primary selected-count">0</span>
                    </div>

                    <div class="card-body">
                        {{-- Form per group --}}
                        <form id="plottingForm" class="schedule-form">
                            @csrf

                            <input type="hidden" name="planning_id" value="{{ $planning->id }}">

                            {{-- Table Karyawan --}}
                            <div class="mb-2">
                                <input type="text" class="form-control table-search" placeholder="Cari karyawan...">
                            </div><br>
                            <div class="table-responsive table-card mb-4" style="max-height: 200px; overflow-y: auto;">
                                <table class="table align-middle table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th style="width: 40px;">
                                                <div class="form-check">
                                                    <input class="form-check-input checkAll" type="checkbox">
                                                </div>
                                            </th>
                                            <th>NIK OS</th>
                                            <th>Nama</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list form-check-all">
                                        @foreach($employees as $emp)
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="employee_ids[]" value="{{ $emp->id }}" id="emp{{ $emp->id }}" @if(in_array($emp->id, $plottingEmployeeIds)) disabled @endif>
                                                    <label class="form-check-label" for="emp{{ $emp->id }}"></label>
                                                </div>
                                            </td>
                                            <td>{{ $emp->nik_os }}</td>
                                            <td>{{ $emp->nama_karyawan }}</td>

                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                            {{-- Tombol Simpan --}}
                            <div class="mt-3">
                                <button type="submit" class="btn btn-success">Simpan Plotting</button>
                                <a href="{{ route('foreman.data_planing') }}" class="btn btn-secondary">Kembali</a>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </div>


        @if($planning->plottingKehadiran->count() > 0)
        <div class="row">
            <div class="col-lg-12">
                <div class="card" id="ticketsList">
                    <div class="card-header border-0">
                        <div class="d-flex align-items-center">
                            <h5 class="card-title mb-0 flex-grow-1">Daftar Karyawan Yang Sudah Di Plotting</h5>

                        </div>
                    </div>
                    <div class="card-body border border-dashed border-end-0 border-start-0">
                        <form>
                            <div class="row g-3">
                                <div class="col-xxl-5 col-sm-12">
                                    <div class="search-box">
                                        <input type="text" class="form-control search" id="searchField" placeholder="Cari Nama...">
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
                                        <th>Nama Karyawan</th>
                                        <th>NIK OS</th>
                                        <th>Tanggal Plotting</th>
                                        <th>Status Konfirmasi</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="list form-check-all" id="ticket-list-data">
                                    @foreach ($planning->plottingKehadiran as $plot)
                                    <tr id="row-{{ $plot->id }}">

                                        <td>{{ $plot->employee->nama_karyawan ?? '-' }}</td>
                                        <td>{{ $plot->employee->nik_os ?? '-' }}</td>
                                        <td>{{ $plot->tanggal ?? '-' }}</td>
                                        <td>{{ $plot->status_konfirmasi ?? 'Belum Konfirmasi' }}</td>
                                        <td>
                                            <button class="btn btn-warning btn-sm edit-plotting" data-id="{{ $plot->id }}" data-nama="{{ $plot->employee->nama_karyawan ?? '-' }}" data-nik="{{ $plot->employee->nik_os ?? '-' }}" data-tanggal="{{ $plot->tanggal ?? '' }}" data-employee-id="{{ $plot->employee_id }}">
                                                Edit
                                            </button>
                                            <button class="btn btn-danger btn-sm delete-plotting" data-id="{{ $plot->id }}">Hapus</button>
                                        </td>

                                    </tr>
                                    @endforeach
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

        @endif

        <!-- Modal Edit Plotting -->
        <div class="modal fade" id="editPlottingModal" tabindex="-1" aria-labelledby="editPlottingModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <form id="editPlottingForm">
                    @csrf
                    <input type="hidden" name="id" id="edit-id">
                    <input type="hidden" name="planning_id" value="{{ $planning->id }}">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Ganti Karyawan Plotting</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                        </div>
                        <div class="modal-body">

                            <div class="mb-3">
                                <label class="form-label">Tanggal Plotting</label>
                                <input type="date" class="form-control" name="tanggal" id="edit-tanggal" required>
                            </div>

                            <div class="mb-2">
                                <input type="text" class="form-control modal-table-search" placeholder="Cari karyawan...">
                            </div>

                            <div class="table-responsive" style="max-height: 250px; overflow-y: auto;">
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th style="width: 40px;"></th>
                                            <th>NIK OS</th>
                                            <th>Nama</th>
                                        </tr>
                                    </thead>
                                    <tbody id="modalEmployeeList">
                                        @foreach($employees as $emp)
                                        <tr>
                                            <td>
                                                <input type="radio" name="new_employee_id" value="{{ $emp->id }}" id="radioEmp{{ $emp->id }}" @if(in_array($emp->id, $plottingEmployeeIds)) disabled @endif>
                                            </td>
                                            <td>{{ $emp->nik_os }}</td>
                                            <td>{{ $emp->nama_karyawan }}</td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success">Simpan Perubahan</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    </div>
</div>
<script>
    $(document).ready(function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        const max = "{{$planning->jumlah_karyawan}}";
        const checkboxes = $('input[type="checkbox"][name="employee_ids[]"]');

        function toggleLimit() {
            const alreadyPlotted = $('input[name="employee_ids[]"]:disabled').length;
            const checked = checkboxes.filter(':checked').length;
            const totalSelected = checked + alreadyPlotted;

            checkboxes.each(function() {
                if (!$(this).is(':checked') && !$(this).is(':disabled')) {
                    $(this).prop('disabled', totalSelected >= max);
                }
            });
        }


        checkboxes.on('change', toggleLimit);

        $('#plottingForm').on('submit', function(e) {
            e.preventDefault();
            const formData = $(this).serialize();

            // Tampilkan loading SweetAlert
            Swal.fire({
                title: 'Menyimpan...',
                text: 'Harap tunggu sebentar.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            $.ajax({
                url: "{{ route('foreman.plotting.store') }}",
                method: 'POST',
                data: formData,
                success: function(res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: res.message || 'Plotting berhasil disimpan.',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        location.reload();
                    });
                },
                error: function(xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal menyimpan',
                        text: xhr.responseJSON?.message || 'Terjadi kesalahan. Coba lagi nanti.'
                    });
                }
            });
        });


        // Fungsi: update jumlah terpilih & sorting checkbox yang dicentang ke atas
        function refreshFormState(form) {
            let tbody = form.find('tbody');
            let checkedCount = tbody.find('input[type="checkbox"]:checked').length;
            form.closest('.card').find('.selected-count').text(checkedCount);

            // Sorting
            let rows = tbody.find('tr').get();
            rows.sort(function(a, b) {
                let aChecked = $(a).find('input[type="checkbox"]').prop('checked');
                let bChecked = $(b).find('input[type="checkbox"]').prop('checked');
                return (aChecked === bChecked) ? 0 : aChecked ? -1 : 1;
            });
            $.each(rows, function(_, row) {
                tbody.append(row);
            });
        }

        // Checkbox individual berubah
        $(document).on('change', '.schedule-form input[type="checkbox"]', function() {
            let form = $(this).closest('.schedule-form');
            refreshFormState(form);
        });

        // Tombol Check All diklik
        $(document).on('click', '.checkAll', function() {
            let form = $(this).closest('.schedule-form');
            let checkAll = $(this).prop('checked');
            form.find('tbody input[type="checkbox"]:not(:disabled)').prop('checked', checkAll);
            refreshFormState(form);
        });

        // Fitur pencarian per tabel
        $(document).on('input', '.table-search', function() {
            let searchVal = $(this).val().toLowerCase();
            let rows = $(this).closest('form').find('table tbody tr');
            rows.each(function() {
                let rowText = $(this).text().toLowerCase();
                $(this).toggle(rowText.includes(searchVal));
            });
        });
    });

    $(document).on('click', '.delete-plotting', function(e) {
        e.preventDefault();
        const id = $(this).data('id');

        Swal.fire({
            title: 'Yakin ingin menghapus?',
            text: "Data plotting ini akan dihapus permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "{{url('/foreman/plotting')}}" + '/' + id,
                    type: 'DELETE',
                    data: {
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(res) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Plotting berhasil dihapus.',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            location.reload();
                        });
                    },
                    error: function(err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal',
                            text: 'Gagal menghapus data.',
                        });
                    }
                });
            }
        });
    });

    $(document).on('click', '.edit-plotting', function() {
        const id = $(this).data('id');
        const tanggal = $(this).data('tanggal');
        const employeeId = $(this).data('employee-id');

        $('#edit-id').val(id);
        $('#edit-tanggal').val(tanggal);

        // Reset dulu semua radio
        $('#modalEmployeeList input[type=radio]').prop('checked', false);

        // Pilih radio yang sesuai dengan employeeId
        if (employeeId) {
            $('#modalEmployeeList input[type=radio][value="' + employeeId + '"]').prop('checked', true);
        }

        $('#editPlottingModal').modal('show');
    });


    $('#editPlottingForm').on('submit', function(e) {
        e.preventDefault();
        const formData = $(this).serialize();

        Swal.fire({
            title: 'Menyimpan...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.ajax({
            url: "{{ route('plotting.update') }}",
            method: 'POST',
            data: formData,
            success: function(res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.message || 'Plotting berhasil diperbarui.',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => location.reload());
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal menyimpan',
                    text: xhr.responseJSON?.message || 'Terjadi kesalahan.'
                });
            }
        });
    });

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
</script>

@endsection