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
                                                <h1>Data Karyawan Outsorcing </h1>
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
                                <div class="col-xxl-3 col-sm-4">
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
                                <a class="nav-link active py-2" data-bs-toggle="tab" href="#tabAll" role="tab">🧾 Semua Karyawan KMJ</a>
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
</div>
<script>
    $(document).ready(function() {
        loadKaryawanData();

        // Trigger search saat enter ditekan
        $('#searchKaryawan').on('keypress', function(e) {
            if (e.which === 13) filterKaryawan();
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
        $.getJSON('{{ url("admin/employees/kmj") }}', function(data) {
            window.allKaryawanData = data; // simpan global
            renderKaryawan(data);
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

    function renderKaryawan(data) {
        const tables = {
            tabAllTable: [],
            tabKMJTable: [],
            tabFortunaTable: []
        };

        const itemsPerPage = 10;
        let currentPage = 1;

        function paginate(tableId, rows) {
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
                    <button class="btn btn-sm btn-warning btn-ubah-status" data-id="${item.id}" data-nama="${item.nama_karyawan}">Ubah Status</button>
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