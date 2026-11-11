<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const API = 'https://localhost:7140/api'
const router = useRouter()

const email = ref('')
const senha = ref('')
const mensagem = ref('')

async function realizarLogin() {
    mensagem.value = ''

    try {
        const resposta = await fetch(`${API}/Usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email.value,
                Senha: senha.value
            })
        })

        const dados = await resposta.json()

        if (!resposta.ok) {
            mensagem.value = dados.mensagem || 'E-mail ou senha incorretos.'
            return
        }

        
        localStorage.setItem('user_token', dados.token)

     
        if (dados.usuario) {
            localStorage.setItem('user_data', JSON.stringify(dados.usuario))
        }

        
        router.push('/inicio')

    } catch (erro) {
        mensagem.value = 'Erro de conexão com o servidor.'
    }
}

function irParaRegistro() {
    router.push('/registro')
}
</script>

<template>
    <div>
        <h1>Login</h1>

        <div>
            <label>Email:</label>
            <input v-model="email" type="email" placeholder="Digite seu email">
        </div>

        <div>
            <label>Senha:</label>
            <input v-model="senha" type="password" placeholder="Digite sua senha">
        </div>

        <button @click="realizarLogin">Entrar</button>
        <button @click="irParaRegistro">Criar Conta</button>

        <p v-if="mensagem">{{ mensagem }}</p>
    </div>
</template>