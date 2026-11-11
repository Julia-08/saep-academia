
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const API = 'https://localhost:7140/api'
const router = useRouter()

const treinos = ref<any[]>([])
const mensagem = ref('')
const treinoEditando = ref<any>(null)

async function abrirTreinos() {
    try {
        const resposta = await fetch(`${API}/Treino`)
        treinos.value = await resposta.json()
    } catch (erro) {
        mensagem.value = 'Erro ao carregar treinos.'
    }
}

function editarTreino(treino: any) {
    treinoEditando.value = {
        id: treino.id ?? treino.Id,
        data: String(
            treino.dataTreino ?? treino.DataTreino
        ).substring(0, 10)
    }
}

async function salvarTreino() {
    try {
        const resposta = await fetch(
            `${API}/Treino/${treinoEditando.value.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    DataTreino: treinoEditando.value.data
                })
            }
        )

        if (!resposta.ok) {
            mensagem.value = 'Não foi possível atualizar o treino.'
            return
        }

        mensagem.value = 'Treino atualizado com sucesso!'
        treinoEditando.value = null
        abrirTreinos()

    } catch (erro) {
        mensagem.value = 'Erro ao atualizar treino.'
    }
}

function voltar() {
    router.push('/inicio')
}

onMounted(abrirTreinos)
</script>

<template>
    <div>
        <h1>Treinos</h1>

        <button @click="voltar">Voltar</button>

        <p>{{ mensagem }}</p>

        <table border="1">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Descrição</th>
                    <th>Aluno</th>
                    <th>Personal</th>
                    <th>Ação</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="t in treinos" :key="t.id ?? t.Id">
                    <td>{{ t.dataTreino ?? t.DataTreino }}</td>
                    <td>{{ t.horario ?? t.Horario }}</td>
                    <td>{{ t.descricao ?? t.Descricao }}</td>
                    <td>{{ t.nomeAluno ?? t.NomeAluno }}</td>
                    <td>{{ t.nomePersonal ?? t.NomePersonal }}</td>
                    <td>
                        <button @click="editarTreino(t)">
                            Alterar data
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="treinoEditando">
            <h2>Alterar data do treino</h2>

            <input
                type="date"
                v-model="treinoEditando.data"
            >

            <button @click="salvarTreino">Salvar</button>
            <button @click="treinoEditando = null">Cancelar</button>
        </div>
    </div>
</template>
