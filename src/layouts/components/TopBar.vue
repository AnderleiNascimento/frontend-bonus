<template>
  <div class="topbar d-print-none">
    <div class="container-xxl">
      <nav
        class="topbar-custom d-flex justify-content-between"
        id="topbar-custom"
      >
        <ul
          class="topbar-item list-unstyled d-inline-flex align-items-center mb-0"
        >
          <li>
            <button
              class="nav-link mobile-menu-btn nav-icon"
              id="togglemenu"
              @click="toggleLeftSideBar"
            >
              <i class="iconoir-menu-scale"></i>
            </button>
          </li>
          <li class="mx-3 welcome-text">
            <h3 class="mb-0 fw-bold text-truncate">Olá, {{ name }}!</h3>
            <!-- <h6 class="mb-0 fw-normal text-muted text-truncate fs-14">Here's your overview this week.</h6> -->
          </li>
        </ul>
        <ul
          class="topbar-item list-unstyled d-inline-flex align-items-center mb-0"
        >
          <li class="topbar-item">
            <a
              class="nav-link nav-icon"
              href="javascript:void(0);"
              id="light-dark-mode"
              @click="toggleTheme"
            >
              <i class="icofont-sun dark-mode"></i>
              <i class="icofont-moon light-mode"></i>
            </a>
          </li>

          <DropDown is="li" custom-class="topbar-item">
            <a
              class="nav-link dropdown-toggle arrow-none"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <TextCircle :text="initials" size="thumb-lg" />
            </a>
            <div class="dropdown-menu dropdown-menu-end py-0">
              <div
                class="d-flex align-items-center dropdown-item py-2 bg-secondary-subtle"
              >
                <div class="flex-shrink-0">
                  <TextCircle :text="initials" size="thumb-md" />
                </div>
                <div class="flex-grow-1 ms-2 text-truncate align-self-center">
                  <h6 class="my-0 fw-medium text-dark fs-13">{{ name }}</h6>
                  <!-- <small v-if="description" class="text-muted mb-0">{{ description }}</small> -->
                </div>
              </div>
              <div class="dropdown-divider mt-0"></div>
              <!-- <small class="text-muted px-2 pb-1 d-block">Conta</small> -->
               <!--<router-link 
                class="dropdown-item" 
                :to="`/cadastros/usuarios/alterar/${profileId}`"
              >
                <i class="las la-user fs-18 me-1 align-text-bottom" />
                Perfil
              </router-link>
              <div class="dropdown-divider mb-0"></div> -->
              <button class="dropdown-item text-danger" @click.prevent="authStore.logout()">
                <i class="las la-power-off fs-18 me-1 align-text-bottom" />
                Sair
              </button>
            </div>
          </DropDown>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import DropDown from "@/components/DropDown.vue";
import { useLayoutStore } from "@/stores/layout";
import MeService from "@/services/MeService"
import { useAuthStore } from "@/stores/auth";
import { useFormatData } from "@/composables/useFormatData.js"

const useLayout = useLayoutStore();
const { layout, setLeftSideBarSize } = useLayout;

const authStore = useAuthStore()
const formatData = useFormatData()

const name = ref(MeService.getFirstName());
const initials = ref(formatData.getInitialsFirstAndLast(MeService.getName()));
const profileId = ref(MeService.getUser()?.id);
const description = ref(MeService.getUser()?.roles[0]);

const toggleTheme = () => {
  if (useLayout.layout.theme === "light") {
    return useLayout.setTheme("dark");
  }
  useLayout.setTheme("light");
};

const toggleLeftSideBar = () => {
  if (useLayout.layout.leftSideBarSize === "default") {
    return useLayout.setLeftSideBarSize("collapsed");
  }
  if (useLayout.layout.leftSideBarSize === "collapsed") {
    return useLayout.setLeftSideBarSize("default");
  }
};

const resize = () => {
  if (window.innerWidth < 1441) {
    setLeftSideBarSize("collapsed");
  } else {
    setLeftSideBarSize(
      layout.leftSideBarSize === "collapsed"
        ? "default"
        : layout.leftSideBarSize,
    );
  }
};

const windowScroll = () => {
  const navbar = document.getElementById("topbar-custom");
  if (navbar) {
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
};

const leftSideBarClick = () => {
  window.addEventListener("click", (e) => {
    const startbar = document.getElementById("startbar");
    const togglemenu = document.getElementById("togglemenu");
    if (!(startbar && startbar.contains(e.target))) {
      if (window.innerWidth < 1441) {
        if (togglemenu && togglemenu.contains(e.target)) {
          setLeftSideBarSize("default");
        } else {
          setLeftSideBarSize("collapsed");
        }
      }
    }
  });
};

onMounted(() => {
  useLayout.init();
  resize();
  window.addEventListener("scroll", (ev) => {
    ev.preventDefault();
    windowScroll();
  });
  window.addEventListener("resize", () => {
    resize();
  });
  leftSideBarClick();
});
</script>
