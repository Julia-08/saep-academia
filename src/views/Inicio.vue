<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const usuario = JSON.parse(
    localStorage.getItem('user_data') || 'null'
)

function sair() {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_data')
    router.push('/login')
}
</script>

<template>
    <div>
        <h1>IronFit</h1>

        <h2>Bem-vindo(a), {{ usuario?.nome || usuario?.Nome }}!</h2>

        <nav>
            <button @click="router.push('/personais')">
                Personais
            </button>

            <button @click="router.push('/alunos')">
                Alunos
            </button>

            <button @click="router.push('/treinos')">
                Treinos
            </button>
        </nav>

        <button @click="sair">
            Sair
        </button>
    </div>
</template>