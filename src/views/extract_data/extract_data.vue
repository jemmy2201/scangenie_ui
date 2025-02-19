<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText} from 'vuetify/components';

    const route = useRoute();
    const fileData = ref({});

    // Ambil data dari query parameter saat halaman dimuat
    onMounted(() => {
        try {
            if (route.query.data) {
                fileData.value = JSON.parse(route.query.data);
                console.log('jrg 2',fileData.value)
            }
        } catch (error) {
            console.error('Error parsing data:', error);
            fileData.value = {}; // Default jika parsing gagal
        }
    });

    // Fungsi untuk menyimpan perubahan
    const saveChanges = () => {
        console.log('Saved Data:', fileData.value);
        alert('Data updated successfully!');
    };
</script>

<template>
    <v-container>
        <v-card class="edit-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">Edit Uploaded Data</v-card-title>
            <v-card-text>
                <template v-if="Object.keys(fileData).length">
                    <v-text-field
                            v-for="(value, key) in fileData"
                            :key="key"
                            v-model="fileData[key]"
                            :label="key"
                            outlined
                    ></v-text-field>

                    <v-btn block color="primary" class="mt-4" @click="saveChanges">
                        Save Changes
                    </v-btn>
                </template>
                <v-alert v-else type="error" class="mt-2">
                    No data available to edit.
                </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
    .edit-card {
        width: 400px;
        padding: 20px;
        border-radius: 16px;
    }
</style>
