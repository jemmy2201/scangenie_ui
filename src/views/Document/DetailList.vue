<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top center">
            {{ message }}
        </v-snackbar>
        <v-card class="edit-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">Edit Uploaded Data</v-card-title>
            <v-card-text>
                <template v-if="invoices.length">
                    <v-row>
                        <v-col cols="12" v-for="(invoice, index) in invoices" :key="index">
                            <v-card class="mb-4" outlined>
                                <v-card-title class="font-weight-bold">
                                    {{ invoice.filename }}
                                </v-card-title>
                                <v-card-text>
                                    <v-list dense>
                                        <v-list-item v-for="(info, idx) in invoice.extracted_info" :key="idx">
                                            <v-list-item-content>
                                                <v-text-field
                                                        v-model="invoice.extracted_info[idx]"
                                                        outlined
                                                        dense
                                                ></v-text-field>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-space-between align-center mt-4">
                        <v-btn color="secondary" @click="backpage">
                            Back
                        </v-btn>

<!--                        <v-btn color="primary" class="mx-2" @click="DialogClaim = true">-->
<!--                            Select Claim-->
<!--                        </v-btn>-->
<!--                        <v-btn color="primary" class="mx-2" @click="DialogPaymentMode = true">-->
<!--                            Select Payment Mode-->
<!--                        </v-btn>-->
                        <v-btn color="red" v-if="!hidePost" @click="saveChanges">
                            Post
                        </v-btn>
                    </div>
                </template>
                <v-alert v-else type="error" class="mt-2">
                    No data available to edit.
                </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import api from '@/api/axios';
    import { VCol,VList,VListItem, VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText, VTextField,VSnackbar } from 'vuetify/components';
    const router = useRouter();
    const route = useRoute();
    // const router = useRouter();
    const invoices = ref([]);
    const snackbar = ref(false);
    const hidePost = ref(false);
    const message = ref('');
    onMounted(() => {
        try {
            console.log('jrg',route.query.aksi)
            if (route.query.aksi == 1){
                hidePost.value = true
            }
            if (route.query.data) {
                invoices.value = JSON.parse(route.query.data);
            }
        } catch (error) {
            console.error('Error parsing invoice data:', error);
            invoices.value = [];
        }
    });
    const backpage = async () => {
        router.push({
            name: 'ListDocument',
        });
    };
    const saveChanges = async () => {
        // console.log('Updated Invoices:', invoices.value);
        try {
            const payload = invoices.value.map(invoice => ({
                filename: invoice.filename, // Pastikan filename ada
                extracted_info: invoice.extracted_info.map(info => info.trim()) // Bersihkan whitespace
            }));

            // console.log('Sending Data:', payload);

            const response = await api.post('/extract/save', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // console.log('Response:', response.data);
            if (response.data.success) {
                // Tampilkan notifikasi sukses
                message.value = 'Data saved successfully!';
                snackbar.value = true;
                // Redirect ke halaman "upload_data" setelah sukses
                setTimeout(() => {
                    router.push('/upload_data');
                }, 3000); // Delay 1 detik agar transisi lebih smooth
            }
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Failed to update data!');
        }
    };
    // const LoadData = async (item) => {
    //     try {
    //         const response = await api.post("/extract/find", { id: item.id }); // Sesuaikan endpoint delete
    //         if (response.data.success){
    //
    //         }
    //
    //     } catch (error) {
    //         console.error("Error deleting data:", error);
    //         snackbar.value.message = "Gagal menghapus data!";
    //         snackbar.value.show = true;
    //     }
    // };
</script>

<style scoped>
    .edit-card {
        width: 800px;
        padding: 30px;
        border-radius: 16px;
    }
</style>
