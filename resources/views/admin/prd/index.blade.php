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
                                                <h1>Management Karyawan Outsorcing </h1>
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
                <div class="card" id="leadsList">
                    <div class="card-header border-0">

                        <div class="row g-4 align-items-center">
                            <div class="col-sm-3">
                                <div class="search-box">
                                    <input type="text" class="form-control search" placeholder="Search for...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <div class="col-sm-auto ms-auto">
                                <div class="hstack gap-2">

                                    <button type="button" class="btn btn-info" data-bs-toggle="offcanvas" href="#offcanvasExample"><i class="ri-filter-3-line align-bottom me-1"></i> Fliters</button>
                                    <button type="button" class="btn btn-primary add-btn" id="btnAdd"><i class="ri-add-line align-bottom me-1"></i> Add Karyawan</button>
                                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#uploadModal">
                                        Upload Excel
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="table-responsive table-card">
                                <table class="table align-middle" id="employeeTable">
                                    <thead class="table-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Company</th>
                                            <th>NIK BAS</th>
                                            <th>Nama Vendor</th>
                                            <th>NIK OS</th>
                                            <th>Nama Karyawan</th>
                                            <th>Nomor KTP</th>
                                            <th>Jenis Kelamin</th>
                                            <th>Alamat KTP</th>
                                            <th>Tempat Lahir</th>
                                            <th>Tanggal Lahir</th>
                                            <th>Nomor HP</th>
                                            <th>Email</th>
                                            <th>Agama</th>
                                            <th>Status Nikah</th>
                                            <th>Pendidikan</th>
                                            <th>Employe Type</th>
                                            <th>Action Type</th>
                                            <th>Kode Level</th>
                                            <th>Kode Departemen</th>
                                            <th>Grup</th>
                                            <th>Kode Bagian</th>
                                            <th>Kode Jabatan</th>
                                            <th>Begin Date</th>
                                            <th>Tanggal Masuk</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <div class="noresult" style="display: none">
                                    <div class="text-center">
                                        <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon>
                                        <h5 class="mt-2">Sorry! No Result Found</h5>
                                        <p class="text-muted mb-0">We've searched more than 150+ leads We did not find any leads for you search.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end mt-3">
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
                        </div>
                    </div>
                </div>

            </div>
            <!--end col-->
        </div>

        <!-- Form Modal -->
        <div class="modal fade" id="employeeModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <form id="employeeForm">
                    @csrf
                    <input type="hidden" name="id" id="employee_id">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Tambah/Edit Karyawan</h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <!-- Column 1 -->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Company</label>
                                        <input type="text" name="company" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>NIK BAS</label>
                                        <input type="text" name="nik_bas" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Nama Vendor</label>
                                        <input type="text" name="nama_vendor" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>NIK OS</label>
                                        <input type="text" name="nik_os" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Nama Karyawan</label>
                                        <input type="text" name="nama_karyawan" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Nomor KTP</label>
                                        <input type="text" name="nomor_ktp" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Jenis Kelamin</label>
                                        <select name="jenis_kelamin" class="form-control" required>
                                            <option value="">Pilih…</option>
                                            <option value="L">Laki‑laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Tempat Lahir</label>
                                        <input type="text" name="tempat_lahir" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Tanggal Lahir</label>
                                        <input type="date" name="tanggal_lahir" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Alamat KTP</label>
                                        <textarea name="alamat_ktp" class="form-control" rows="3" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Nomor HP</label>
                                        <input type="text" name="nomor_hp" class="form-control" required>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" name="email" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <!-- Column 2 -->
                                <div class="col-md-6">


                                    <div class="form-group">
                                        <label>Agama</label>
                                        <input type="text" name="agama" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Status Nikah</label>
                                        <input type="text" name="status_nikah" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Pendidikan</label>
                                        <input type="text" name="pendidikan" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Employee Type</label>
                                        <input type="text" name="employee_type" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Action Type</label>
                                        <input type="text" name="action_type" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Kode Level</label>
                                        <input type="text" name="kode_level" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Kode Department</label>
                                        <input type="text" name="kode_department" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Grup</label>
                                        <input type="text" name="grup" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Kode Bagian</label>
                                        <input type="text" name="kode_bagian" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Kode Jabatan</label>
                                        <input type="text" name="kode_jabatan" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Begin Date</label>
                                        <input type="date" name="begin_date" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Tanggal Masuk</label>
                                        <input type="date" name="tanggal_masuk" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success">Simpan</button>


                            <!-- Tombol Batal -->
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal Upload -->
        <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form id="uploadForm" enctype="multipart/form-data">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="uploadModalLabel">Upload Excel Karyawan</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="file" class="form-label">Pilih File Excel</label>
                                <input class="form-control" type="file" id="file" name="file" accept=".xlsx, .xls" required>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Import</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    </div>
</div>
<script>
    $(function() {
        const baseUrl = "{{ url('/admin/employees') }}";
        let employeesList = [];
        let currentPage = 1;
        const itemsPerPage = 10;


        function fetchEmployees() {
            $.ajax({
                url: baseUrl,
                method: 'GET',
                success: function(res) {
                    employeesList = res;
                    renderTable();
                },
                error: function() {
                    alert('Gagal mengambil data karyawan.');
                }
            });
        }

        function renderTable() {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = employeesList.slice(start, end);
            let rows = '';
            paginatedItems.forEach((emp, index) => {
                const no = (currentPage - 1) * itemsPerPage + index + 1;
                rows += `
            <tr>
                <td>${no}</td>
                <td>${emp.company}</td>
                <td>${emp.nik_bas}</td>
                <td>${emp.nama_vendor || ''}</td>
                <td>${emp.nik_os}</td>
                <td>${emp.nama_karyawan}</td>
                <td>${emp.nomor_ktp}</td>
                <td>${emp.jenis_kelamin}</td>
                <td>${emp.alamat_ktp}</td>
                <td>${emp.tempat_lahir}</td>
                <td>${emp.tanggal_lahir}</td>
                <td>${emp.nomor_hp}</td>
                <td>${emp.email}</td>
                <td>${emp.agama}</td>
                <td>${emp.status_nikah}</td>
                <td>${emp.pendidikan}</td>
                <td>${emp.employee_type}</td>
                <td>${emp.action_type}</td>
                <td>${emp.kode_level}</td>
                <td>${emp.kode_department}</td>
                <td>${emp.grup}</td>
                <td>${emp.kode_bagian}</td>
                <td>${emp.kode_jabatan}</td>
                <td>${emp.begin_date}</td>
                <td>${emp.tanggal_masuk}</td>  
                <td>
                    <button class="btn btn-sm btn-warning btnEdit" data-id="${emp.id}">Edit</button>
                    <button class="btn btn-sm btn-danger btnDelete" data-id="${emp.id}">Hapus</button>
                </td>
            </tr>`;
            });

            $('#employeeTable tbody').html(rows);

            // Atur Previous dan Next button
            const totalPages = Math.ceil(employeesList.length / itemsPerPage);
            $('.pagination-prev').toggleClass('disabled', currentPage === 1);
            $('.pagination-next').toggleClass('disabled', currentPage === totalPages);
        }

        $('.pagination-prev').click(function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });

        $('.pagination-next').click(function(e) {
            e.preventDefault();
            const totalPages = Math.ceil(employeesList.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });



        // Add
        $('#btnAdd').click(function() {
            $('#employeeForm')[0].reset();
            $('#employee_id').val('');
            $('#employeeModal').modal('show');
        });

        // Simpan (create/update)
        $('#employeeForm').submit(function(e) {
            e.preventDefault();

            // Ambil value penting untuk validasi
            const company = $('[name="company"]').val().trim();
            const nik_bas = $('[name="nik_bas"]').val().trim();
            const nama_karyawan = $('[name="nama_karyawan"]').val().trim();
            const nomor_hp = $('[name="nomor_hp"]').val().trim();

            // Validasi input wajib
            if (!company || !nik_bas || !nama_karyawan || !nomor_hp) {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Mohon isi semua field wajib (Company, NIK BAS, Nama Karyawan, No. HP).',
                    icon: 'warning'
                });
                return;
            }

            const id = $('#employee_id').val();
            const url = id ? `${baseUrl}/${id}` : baseUrl;
            const method = id ? 'PUT' : 'POST';

            $.ajax({
                url: url,
                method: method,
                data: $(this).serialize(),
                success: function() {
                    $('#employeeModal').modal('hide');
                    fetchEmployees();
                    Swal.fire('Berhasil', 'Data berhasil disimpan.', 'success');
                },
                error: function(xhr) {
                    Swal.fire('Gagal', xhr.responseJSON?.message || 'Gagal menyimpan data', 'error');
                }
            });
        });


        // Edit — ambil langsung dari employeesList, tanpa AJAX GET
        $(document).on('click', '.btnEdit', function() {
            const id = $(this).data('id');
            const emp = employeesList.find(e => e.id == id);
            if (!emp) return alert('Data karyawan tidak ditemukan');

            $('#employee_id').val(emp.id);
            $('[name="company"]').val(emp.company);
            $('[name="nik_bas"]').val(emp.nik_bas);
            $('[name="nama_vendor"]').val(emp.nama_vendor);
            $('[name="nik_os"]').val(emp.nik_os);
            $('[name="nama_karyawan"]').val(emp.nama_karyawan);
            $('[name="nomor_ktp"]').val(emp.nomor_ktp);
            $('[name="jenis_kelamin"]').val(emp.jenis_kelamin);
            $('[name="tempat_lahir"]').val(emp.tempat_lahir);
            $('[name="tanggal_lahir"]').val(emp.tanggal_lahir);
            $('[name="alamat_ktp"]').val(emp.alamat_ktp);
            $('[name="nomor_hp"]').val(emp.nomor_hp);
            $('[name="email"]').val(emp.email);
            $('[name="agama"]').val(emp.agama);
            $('[name="status_nikah"]').val(emp.status_nikah);
            $('[name="pendidikan"]').val(emp.pendidikan);
            $('[name="employee_type"]').val(emp.employee_type);
            $('[name="action_type"]').val(emp.action_type);
            $('[name="kode_level"]').val(emp.kode_level);
            $('[name="kode_department"]').val(emp.kode_department);
            $('[name="grup"]').val(emp.grup);
            $('[name="kode_bagian"]').val(emp.kode_bagian);
            $('[name="kode_jabatan"]').val(emp.kode_jabatan);
            $('[name="begin_date"]').val(emp.begin_date);
            $('[name="tanggal_masuk"]').val(emp.tanggal_masuk);

            $('#employeeModal').modal('show');
        });


        // Delete
        $(document).on('click', '.btnDelete', function() {
            const id = $(this).data('id');
            const emp = employeesList.find(e => e.id == id);

            Swal.fire({
                title: 'Yakin?',
                text: `Data ${emp?.nama_karyawan || 'karyawan'} akan dihapus permanen.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, hapus',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: `${baseUrl}/${id}`,
                        method: 'DELETE',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function() {
                            fetchEmployees();
                            Swal.fire('Berhasil', 'Data berhasil dihapus.', 'success');
                        },
                        error: function() {
                            Swal.fire('Gagal', 'Gagal menghapus karyawan.', 'error');
                        }
                    });
                }
            });
        });

        // initial load
        fetchEmployees();

        $('#uploadForm').submit(function(e) {
            e.preventDefault();
            const formData = new FormData(this);

            $.ajax({
                url: "{{ route('employees.import') }}",
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                beforeSend: () => {
                    Swal.fire({
                        title: 'Mengimpor...',
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading()
                    });
                },
                success: function(res) {
                    Swal.fire('Berhasil', res.message, 'success');
                    $('#uploadModal').modal('hide');
                    fetchEmployees(); // <- refresh table
                },
                error: function(xhr) {
                    let msg = xhr.responseJSON?.message || 'Gagal mengimpor data.';
                    Swal.fire('Gagal', msg, 'error');
                }
            });
        });


        //fitur search
        function handleSearch() {
            const keyword = $('.search').val().toLowerCase();
            const filteredList = employeesList.filter(emp => {
                return (
                    emp.company?.toLowerCase().includes(keyword) ||
                    emp.nik_bas?.toLowerCase().includes(keyword) ||
                    emp.nama_vendor?.toLowerCase().includes(keyword) ||
                    emp.nik_os?.toLowerCase().includes(keyword) ||
                    emp.nama_karyawan?.toLowerCase().includes(keyword) ||
                    emp.nomor_ktp?.toLowerCase().includes(keyword) ||
                    emp.jenis_kelamin?.toLowerCase().includes(keyword) ||
                    emp.alamat_ktp?.toLowerCase().includes(keyword) ||
                    emp.tempat_lahir?.toLowerCase().includes(keyword) ||
                    emp.tanggal_lahir?.toLowerCase().includes(keyword) ||
                    emp.nomor_hp?.toLowerCase().includes(keyword) ||
                    emp.email?.toLowerCase().includes(keyword) ||
                    emp.agama?.toLowerCase().includes(keyword) ||
                    emp.status_nikah?.toLowerCase().includes(keyword) ||
                    emp.pendidikan?.toLowerCase().includes(keyword) ||
                    emp.employee_type?.toLowerCase().includes(keyword) ||
                    emp.action_type?.toLowerCase().includes(keyword) ||
                    emp.kode_level?.toLowerCase().includes(keyword) ||
                    emp.kode_department?.toLowerCase().includes(keyword) ||
                    emp.grup?.toLowerCase().includes(keyword) ||
                    emp.kode_bagian?.toLowerCase().includes(keyword) ||
                    emp.kode_jabatan?.toLowerCase().includes(keyword) ||
                    emp.begin_date?.toLowerCase().includes(keyword) ||
                    emp.tanggal_masuk?.toLowerCase().includes(keyword)
                );
            });

            renderFilteredTable(filteredList);
        }

        function renderFilteredTable(filteredList) {
            currentPage = 1; // reset ke halaman pertama
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = filteredList.slice(start, end);

            let rows = '';
            paginatedItems.forEach((emp, index) => {
                const no = start + index + 1;
                rows += `
        <tr>
            <td>${no}</td>
            <td>${emp.company}</td>
            <td>${emp.nik_bas}</td>
            <td>${emp.nama_vendor || ''}</td>
            <td>${emp.nik_os}</td>
            <td>${emp.nama_karyawan}</td>
            <td>${emp.nomor_ktp}</td>
            <td>${emp.jenis_kelamin}</td>
            <td>${emp.alamat_ktp}</td>
            <td>${emp.tempat_lahir}</td>
            <td>${emp.tanggal_lahir}</td>
            <td>${emp.nomor_hp}</td>
            <td>${emp.email}</td>
            <td>${emp.agama}</td>
            <td>${emp.status_nikah}</td>
            <td>${emp.pendidikan}</td>
            <td>${emp.employee_type}</td>
            <td>${emp.action_type}</td>
            <td>${emp.kode_level}</td>
            <td>${emp.kode_department}</td>
            <td>${emp.grup}</td>
            <td>${emp.kode_bagian}</td>
            <td>${emp.kode_jabatan}</td>
            <td>${emp.begin_date}</td>
            <td>${emp.tanggal_masuk}</td>  
            <td>
                <button class="btn btn-sm btn-warning btnEdit" data-id="${emp.id}">Edit</button>
                <button class="btn btn-sm btn-danger btnDelete" data-id="${emp.id}">Hapus</button>
            </td>
        </tr>`;
            });

            $('#employeeTable tbody').html(rows);

            // Atur pagination
            const totalPages = Math.ceil(filteredList.length / itemsPerPage);
            $('.pagination-prev').toggleClass('disabled', currentPage === 1);
            $('.pagination-next').toggleClass('disabled', currentPage === totalPages);
        }

        $('.search').on('input', function() {
            handleSearch();
        });
    });
</script>

@endsection