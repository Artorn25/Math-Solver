<script setup lang="ts">
import { provide, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import MathSolver from './components/MathSolver.vue'
import DetailCards from './components/DetailCards.vue'
import ProfileModal from './components/ProfileModal.vue'
import ToastAlerts from './components/ToastAlerts.vue'
import { useMathSolver } from './composables/useMathSolver'
import { useSolverHistory } from './composables/useSolverHistory'

const solver = useMathSolver()
const history = useSolverHistory()
provide('mathSolver', solver)
provide('solverHistory', history)

const { showDetails, toastStatus, toastMessage, clearToast } = solver

const showProfile = ref(false)

function openProfile() {
  showProfile.value = true
}
</script>

<template>
  <LoadingSpinner />
  <Navbar @open-profile="openProfile" />

  <main>
    <MathSolver />
    <DetailCards v-if="showDetails" @open-profile="openProfile" />
  </main>

  <Footer />

  <ProfileModal :open="showProfile" @close="showProfile = false" />
  <ToastAlerts :status="toastStatus" :message="toastMessage" @clear="clearToast" />
</template>
