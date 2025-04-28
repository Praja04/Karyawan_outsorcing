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
            <div class="col-lg-4 mb-4">
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

                            {{-- Input Minggu, Bulan, Tahun --}}
                            <div class="row mb-3">
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">Minggu ke-</label>
                                    <input type="number" name="week" required class="form-control">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">Bulan</label>
                                    <select name="month" required class="form-select">
                                        @foreach(range(1,12) as $month)
                                        <option value="{{ $month }}" {{ $month == now()->month ? 'selected' : '' }}>
                                            {{ DateTime::createFromFormat('!m', $month)->format('F') }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">Tahun</label>
                                    <input type="number" name="year" value="{{ now()->year }}" required class="form-control">
                                </div>
                            </div>

                            {{-- Table Karyawan --}}
                            <div class="table-responsive table-card mb-4" style="max-height: 400px; overflow-y: auto;">
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
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="employee_ids[]" value="{{ $employee->id }}">
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


    </div>
</div>

<script>
    $(document).ready(function() {
        // Setup CSRF
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });


        // Function: Update counter
        function updateSelectedCount(form) {
            let checkedCount = form.find('tbody input[type="checkbox"]:checked').length;
            let groupId = form.closest('.card').attr('id'); // misal: group-0, group-1
            $('#' + groupId).find('.selected-count').text(checkedCount);
        }

        // Saat centang/uncentang checkbox
        $(document).on('change', '.schedule-form input[type="checkbox"]', function() {
            let form = $(this).closest('.schedule-form');
            updateSelectedCount(form);
        });

        // Saat klik Check All
        $('.checkAll').click(function() {
            let form = $(this).closest('.schedule-form');
            $(this).closest('table').find('tbody input[type="checkbox"]').prop('checked', this.checked);
            updateSelectedCount(form);
        });


        // Submit Form
        $('.schedule-form').submit(function(e) {
            e.preventDefault();

            let form = $(this);
            let formData = form.serialize();
            let groupName = form.data('group');

            $.ajax({
                url: "{{ url('schedule/store') }}",
                type: "POST",
                data: formData,
                success: function(response) {
                    // Cek respon dari controller
                    if (response.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: response.message + ' (Grup: ' + groupName + ')',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Perhatian!',
                            text: response.message || 'Ada yang salah!',
                        });
                    }
                },
                error: function(xhr) {
                    // Tangkap error detail kalau ada
                    let errorMessage = 'Gagal menyimpan jadwal!';
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage = xhr.responseJSON.message;
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errorMessage,
                    });
                }
            });
        });

        // Check All checkbox
        $('.checkAll').click(function() {
            $(this).closest('table').find('tbody input[type="checkbox"]').prop('checked', this.checked);
        });
    });
</script>


@endsection