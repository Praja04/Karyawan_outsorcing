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
                                                <h1>Penjadwalan Karyawan Outsorcing </h1>
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

        @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
        @endif




        {{-- List Karyawan per Group --}}
        <div class="row">
            @foreach($groups as $group)
            <div class="col-lg-6 mb-6">
                <div class="card" id="group-{{ $loop->index }}">
                    <div class="card-header d-flex align-items-center">
                        <h5 class="card-title mb-0 flex-grow-1">Group: {{ $group ?? 'Tanpa Group' }}</h5>
                        <span class="badge bg-primary selected-count" id="selected-count-{{ $loop->index }}">0</span>
                    </div>

                    <div class="card-body">
                        {{-- Form per group --}}
                        <form class="schedule-form" data-group="{{ $group }}">
                            @csrf

                            <input type="hidden" name="group" value="{{ $group }}">

                            {{-- Input tanggal --}}
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Start Date</label>
                                    <input type="date" name="start_date" required class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">End Date</label>
                                    <input type="date" name="end_date" required class="form-control">
                                </div>
                            </div>

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
                                            <th>NIK BAS</th>
                                            <th>Nama</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list form-check-all">
                                        @foreach($employees->where('grup', $group) as $employee)
                                        @php
                                        // Cek apakah karyawan sudah punya jadwal di tanggal yang sama (start & end)
                                        $hasSameSchedule = $schedules->contains(function($schedule) use ($employee) {
                                        return $schedule->employee_id == $employee->id &&
                                        request()->has('start_date') && request()->has('end_date') &&
                                        $schedule->start_date == request('start_date') &&
                                        $schedule->end_date == request('end_date');
                                        });
                                        @endphp
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="employee_ids[]" value="{{ $employee->id }}" {{ $hasSameSchedule ? 'disabled' : '' }}>
                                                </div>
                                            </td>
                                            <td>{{ $employee->nik_bas }}</td>
                                            <td>{{ $employee->nama_karyawan }}</td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                            {{-- Tombol Simpan --}}
                            <div class="d-flex justify-content-end mt-2">
                                <button type="submit" class="btn btn-success w-100">
                                    Simpan Jadwal
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            @endforeach


        </div>

        <h4>Data Jadwal Kehadiran Karyawan</h4>

        <div class="table-responsive mt-3">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nama Karyawan</th>
                        <th>NIK BAS</th>
                        <th>Grup</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status Hadir</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($schedules as $schedule)
                    <tr>
                        <td>{{ $schedule->employee->nama_karyawan ?? '-' }}</td>
                        <td>{{ $schedule->employee->nik_bas ?? '-' }}</td>
                        <td>{{ $schedule->group ?? '-' }}</td>
                        <td>{{ \Carbon\Carbon::parse($schedule->start_date)->format('d-m-Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($schedule->end_date)->format('d-m-Y') }}</td>
                        <td>
                            @if($schedule->status_hadir)
                            <span class="badge bg-success">Hadir</span>
                            @else
                            <span class="badge bg-danger">Tidak Hadir</span>
                            @endif
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="text-center">Belum ada data jadwal.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
<script>
    $(document).ready(function() {
        // Setup CSRF token untuk semua request AJAX
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
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

        // Submit form
        $('.schedule-form').submit(function(e) {
            e.preventDefault();

            let form = $(this);
            let formData = form.serialize();
            let groupName = form.data('group');

            $.post("{{ url('schedule/store') }}", formData)
                .done(function(response) {
                    if (response.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: response.message + ' (Grup: ' + groupName + ')',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => location.reload());
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Perhatian!',
                            text: response.message || 'Ada yang salah!',
                        });
                    }
                })
                .fail(function(xhr) {
                    let errorMsg = xhr.responseJSON?.message || 'Gagal menyimpan jadwal!';
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errorMsg,
                    });
                });
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

        // Cek jadwal yang sudah ada dan disablekan checkbox
        $('.schedule-form').each(function() {
            const $form = $(this);
            const $start = $form.find('input[name="start_date"]');
            const $end = $form.find('input[name="end_date"]');
            const $checkboxes = $form.find('input[type="checkbox"][name="employee_ids[]"]');

            function updateDisabledCheckboxes() {
                const startDate = $start.val();
                const endDate = $end.val();
                if (!startDate || !endDate) return;

                $.get("{{url('/check-schedule')}}", {
                        start_date: startDate,
                        end_date: endDate
                    })
                    .done(function(disabledIds) {
                        $checkboxes.each(function() {
                            const $cb = $(this);
                            const id = parseInt($cb.val());
                            const isDisabled = disabledIds.includes(id);

                            $cb.prop('disabled', isDisabled);
                            $cb.closest('tr').toggleClass('table-secondary', isDisabled);
                        });
                    })
                    .fail(function(err) {
                        console.error('Jadwal fetch error:', err);
                    });
            }

            $start.on('change', updateDisabledCheckboxes);
            $end.on('change', updateDisabledCheckboxes);
        });
    });
</script>



@endsection