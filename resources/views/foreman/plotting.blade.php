@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <h4>Plotting Karyawan untuk Group: {{ $planning->group }}</h4>
        <p>Rentang Tanggal: {{ $planning->start_date }} - {{ $planning->end_date }}</p>
        <p>Jumlah dibutuhkan: {{ $planning->jumlah_karyawan }}</p>


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
                                <a href="{{ route('foreman.dashboard') }}" class="btn btn-secondary">Kembali</a>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </div>




        @if($planning->plottingKehadiran->count() > 0)
        <div class="mt-5">
            <h5>Daftar Karyawan yang Sudah Dipilih:</h5>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nama Karyawan</th>
                        <th>NIK OS</th>
                        <th>Tanggal Plotting</th>
                        <th>Status Konfirmasi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($planning->plottingKehadiran as $plot)
                    <tr id="row-{{ $plot->id }}">
                        <td>{{ $plot->employee->nama_karyawan ?? '-' }}</td>
                        <td>{{ $plot->employee->nik_os ?? '-' }}</td>
                        <td>{{ $plot->tanggal ?? '-' }}</td>
                        <td>{{ $plot->status_konfirmasi ?? 'Belum Konfirmasi' }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-plotting" data-id="{{ $plot->id }}">Hapus</button>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @endif


    </div>
</div>
<script>
    $(document).ready(function() {
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
</script>

@endsection