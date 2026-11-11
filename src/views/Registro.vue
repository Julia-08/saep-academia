<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const API = 'https://localhost:7140/api'
const router = useRouter()

const nome = ref('')
const email = ref('')
const senha = ref('')
const mensagem = ref('')

async function cadastrarUsuario() {
    try {
        const resposta = await fetch(`${API}/Usuario/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nome: nome.value,
                Email: email.value,
                Senha: senha.value
            })
        })

        const dados = await resposta.json()

        if (!resposta.ok) {
            mensagem.value = dados.mensagem || 'Erro ao realizar cadastro.'
            return
        }

        mensagem.value = 'Usuário registrado com sucesso!'
        setTimeout(() => {
            router.push('/login')
        }, 1500)

    } catch (erro) {
        mensagem.value = 'Erro de conexão com o servidor.'
    }
}

function irParaLogin() {
    router.push('/login')
}
</script>

<template>
    <div>
        <h1>Registrar Usuário</h1>

        <div>
            <label>Nome:</label>
            <input v-model="nome" type="text" placeholder="Digite seu nome">
        </div>

        <div>
            <label>Email:</label>
            <input v-model="email" type="email" placeholder="Digite seu email">
        </div>

        <div>
            <label>Senha:</label>
            <input v-model="senha" type="password" placeholder="Digite sua senha">
        </div>

        <button @click="cadastrarUsuario">Cadastrar</button>
        <button @click="irParaLogin">Já tenho conta</button>

        <p>{{ mensagem }}</p>
    </div>
</template>