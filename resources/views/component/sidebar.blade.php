<div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <!-- Light Logo-->
       
        <a href="{{ url('menu') }}" class="logo logo-light">
            <span class="logo-sm">
                <img src="{{ asset('assets/images/icon-utility/kecap.png') }}" alt="" height="25">
            </span>
            <span class="logo-lg">
                <img src="{{ asset('assets/images/icon-utility/kecap.png') }}" alt="" height="100">
            </span>
        </a>
       
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>

    <div id="scrollbar">
        <div class="container-fluid">

            <div id="two-column-menu">
            </div>
            <ul class="navbar-nav" id="navbar-nav">
                <li class="menu-title"><span data-key="t-menu">Menu</span></li>

                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ url('admin/dashboard') }}">
                        <i class="mdi mdi-card-account-details"></i> <span data-key="t-widgets">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ url('admin/kelola/karyawan') }}">
                        <i class="mdi mdi-card-account-details"></i> <span data-key="t-widgets">Manage Karyawan</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ url('admin/plotting/prd') }}">
                        <i class="mdi mdi-card-account-details"></i> <span data-key="t-widgets">Plotting Karyawan</span>
                    </a>
                </li>
                <li class="menu-title"><i class="ri-more-fill"></i> <span data-key="t-pages">Lainnya</span></li>
               
            </ul>
        </div>
        <!-- Sidebar -->
    </div>


    <div class="sidebar-background"></div>
</div>