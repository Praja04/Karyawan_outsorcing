@extends('layout')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <h4>Plotting Karyawan untuk Group: {{ $planning->group }}</h4>
        <p>Rentang Tanggal: {{ $planning->start_date }} - {{ $planning->end_date }}</p>
        <p>Jumlah dibutuhkan: {{ $planning->jumlah_karyawan }}</p>

        <form action="{{ route('foreman.plotting.store') }}" method="POST">
            @csrf
            <input type="hidden" name="planning_id" value="{{ $planning->id }}">

            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Karyawan</th>
                            <th>NIK OS</th>
                            <th>Pilih Karyawan</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($employees as $emp)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $emp->nama_karyawan }}</td>
                            <td>{{ $emp->nik_os }}</td>
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="employee_ids[]" value="{{ $emp->id }}" id="emp{{ $emp->id }}" @if(in_array($emp->id, $plottingEmployeeIds)) disabled @endif>
                                    <label class="form-check-label" for="emp{{ $emp->id }}"></label>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="mt-3">
                <button type="submit" class="btn btn-success">Simpan Plotting</button>
                <a href="{{ route('foreman.dashboard') }}" class="btn btn-secondary">Kembali</a>
            </div>
        </form>


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

            $.ajax({
                url: $(this).attr('action'),
                method: 'POST',
                data: formData,
                success: function(res) {
                    alert('Plotting berhasil disimpan!');
                    window.location.href = "{{ route('foreman.dashboard') }}";
                },
                error: function(xhr) {
                    alert('Gagal menyimpan plotting:\n' + (xhr.responseJSON.message || 'Unknown error'));
                }
            });
        });
    });

    $(document).on('click', '.delete-plotting', function(e) {
        e.preventDefault();
        const id = $(this).data('id');

        if (confirm('Yakin ingin menghapus plotting ini?')) {
            $.ajax({
                url: '/foreman/plotting/' + id,
                type: 'DELETE',
                data: {
                    _token: '{{ csrf_token() }}'
                },
                success: function(res) {
                    $('#row-' + id).remove();
                    alert('Plotting berhasil dihapus.');
                },
                error: function(err) {
                    alert('Gagal menghapus data.');
                }
            });
        }
    });
</script>

@endsection