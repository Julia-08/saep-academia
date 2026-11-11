
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const API = 'https://localhost:7140/api'
const router = useRouter()

const alunos = ref<any[]>([])
const personais = ref<any[]>([])
const mensagem = ref('')

const alunoNovo = ref({
    nome: '',
    telefone: '',
    email: '',
    personalId: ''
})

async function abrirAlunos() {
    try {
        const respostas = await Promise.all([
            fetch(`${API}/Aluno`),
            fetch(`${API}/Personal`)
        ])

        alunos.value = await respostas[0].json()
        personais.value = await respostas[1].json()

    } catch (erro) {
        mensagem.value = 'Erro ao carregar os dados.'
    }
}

async function cadastrarAluno() {
    try {
        const resposta = await fetch(`${API}/Aluno`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nome: alunoNovo.value.nome,
                Telefone: alunoNovo.value.telefone,
                Email: alunoNovo.value.email,
                PersonalId: Number(alunoNovo.value.personalId)
            })
        })

        if (!resposta.ok) {
            mensagem.value = 'Não foi possível cadastrar o aluno.'
            return
        }

        mensagem.value = 'Aluno cadastrado com sucesso!'

        alunoNovo.value = {
            nome: '',
            telefone: '',
            email: '',
            personalId: ''
        }

        abrirAlunos()

    } catch (erro) {
        mensagem.value = 'Erro ao cadastrar aluno.'
    }
}

function voltar() {
    router.push('/inicio')
}

onMounted(abrirAlunos)
</script>

<template>
    <div>
        <h1>Alunos</h1>

        <button @click="voltar">Voltar</button>

        <h2>Cadastrar Aluno</h2>

        <form @submit.prevent="cadastrarAluno">
            <div>
                <label>Nome:</label>
                <input v-model="alunoNovo.nome" required>
            </div>

            <div>
                <label>Telefone:</label>
                <input v-model="alunoNovo.telefone">
            </div>

            <div>
                <label>Email:</label>
                <input v-model="alunoNovo.email" type="email">
            </div>

            <div>
                <label>Personal:</label>

                <select v-model="alunoNovo.personalId" required>
                    <option value="">Selecione</option>

                    <option
                        v-for="p in personais"
                        :key="p.id ?? p.Id"
                        :value="p.id ?? p.Id"
                    >
                        {{ p.nome ?? p.Nome }}
                    </option>
                </select>
            </div>

            <button type="submit">Cadastrar</button>
        </form>

        <p>{{ mensagem }}</p>

        <h2>Lista de Alunos</h2>

        <table border="1">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Personal</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="a in alunos" :key="a.id ?? a.Id">
                    <td>{{ a.nome ?? a.Nome }}</td>
                    <td>{{ a.telefone ?? a.Telefone }}</td>
                    <td>{{ a.email ?? a.Email }}</td>
                    <td>{{ a.nomePersonal ?? a.NomePersonal }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
