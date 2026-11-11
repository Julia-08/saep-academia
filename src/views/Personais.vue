<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const API = 'https://localhost:7140/api'
const router = useRouter()

const personais = ref<any[]>([])
const termoBusca = ref('')
const mensagem = ref('')
const personalEditando = ref<any>(null)

const novoPersonal = ref({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    especialidade: ''
})

async function abrirPersonais() {
    try {
        const resposta = await fetch(
            `${API}/Personal?termo=${termoBusca.value}`
        )
        personais.value = await resposta.json()
    } catch (erro) {
        mensagem.value = 'Erro ao carregar personais.'
    }
}

async function cadastrarPersonal() {
    try {
        const resposta = await fetch(`${API}/Personal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nome: novoPersonal.value.nome,
                Cpf: novoPersonal.value.cpf,
                Telefone: novoPersonal.value.telefone,
                Email: novoPersonal.value.email,
                Especialidade: novoPersonal.value.especialidade
            })
        })

        if (!resposta.ok) {
            mensagem.value = 'Não foi possível cadastrar o personal.'
            return
        }

        mensagem.value = 'Personal cadastrado com sucesso!'
        novoPersonal.value = { nome: '', cpf: '', telefone: '', email: '', especialidade: '' }
        abrirPersonais()

    } catch (erro) {
        mensagem.value = 'Erro ao cadastrar personal.'
    }
}

function editarPersonal(personal: any) {
    personalEditando.value = {
        id: personal.id ?? personal.Id,
        nome: personal.nome ?? personal.Nome,
        cpf: personal.cpf ?? personal.Cpf ?? '',
        telefone: personal.telefone ?? personal.Telefone ?? '',
        email: personal.email ?? personal.Email,
        especialidade: personal.especialidade ?? personal.Especialidade ?? ''
    }
}

async function salvarPersonal() {
    try {
        const resposta = await fetch(
            `${API}/Personal/${personalEditando.value.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Nome: personalEditando.value.nome,
                    Cpf: personalEditando.value.cpf,
                    Telefone: personalEditando.value.telefone,
                    Email: personalEditando.value.email,
                    Especialidade: personalEditando.value.especialidade
                })
            }
        )

        if (!resposta.ok) {
            mensagem.value = 'Não foi possível atualizar o personal.'
            return
        }

        mensagem.value = 'Personal atualizado com sucesso!'
        personalEditando.value = null
        abrirPersonais()

    } catch (erro) {
        mensagem.value = 'Erro ao atualizar personal.'
    }
}

function voltar() {
    router.push('/inicio')
}

onMounted(abrirPersonais)
</script>

<template>
    <div>
        <h1>Personais</h1>

        <button @click="voltar">Voltar</button>

        <div>
            <h2>Novo Personal</h2>
            <label>Nome:</label>
            <input v-model="novoPersonal.nome" placeholder="Nome">

            <label>CPF:</label>
            <input v-model="novoPersonal.cpf" placeholder="CPF">

            <label>Telefone:</label>
            <input v-model="novoPersonal.telefone" placeholder="Telefone">

            <label>Email:</label>
            <input v-model="novoPersonal.email" placeholder="Email">

            <label>Especialidade:</label>
            <input v-model="novoPersonal.especialidade" placeholder="Especialidade">

            <button @click="cadastrarPersonal">Cadastrar</button>
        </div>

        <hr>

        <div>
            <input
                v-model="termoBusca"
                placeholder="Buscar personal pelo nome"
            >
            <button @click="abrirPersonais">Buscar</button>
        </div>

        <p>{{ mensagem }}</p>

        <table border="1">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Especialidade</th>
                    <th>Ação</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="p in personais" :key="p.id ?? p.Id">
                    <td>{{ p.nome ?? p.Nome }}</td>
                    <td>{{ p.cpf ?? p.Cpf }}</td>
                    <td>{{ p.telefone ?? p.Telefone }}</td>
                    <td>{{ p.email ?? p.Email }}</td>
                    <td>{{ p.especialidade ?? p.Especialidade }}</td>
                    <td>
                        <button @click="editarPersonal(p)">
                            Editar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="personalEditando">
            <h2>Editar Personal</h2>

            <label>Nome:</label>
            <input v-model="personalEditando.nome">

            <label>CPF:</label>
            <input v-model="personalEditando.cpf">

            <label>Telefone:</label>
            <input v-model="personalEditando.telefone">

            <label>Email:</label>
            <input v-model="personalEditando.email">

            <label>Especialidade:</label>
            <input v-model="personalEditando.especialidade">

            <button @click="salvarPersonal">Salvar</button>
            <button @click="personalEditando = null">Cancelar</button>
        </div>
    </div>
</template>