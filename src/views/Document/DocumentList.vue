<template>
        <v-container>
                <!-- Snackbar Notifikasi -->
                <v-snackbar v-model="snackbar.show" :timeout="3000" color="success" location="top center">
                        {{ snackbar.message }}
                </v-snackbar>

                <!-- Tabel Data -->
                <v-data-table
                        :headers="headers"
                        :items="items"
                        :items-per-page="5"
                        item-value="id"
                >
                        <template v-slot:[`item.actions`]="{ item }">  <!-- Perbaikan di sini -->
                                <div class="text-right">
                                        <v-icon class="mr-2" color="primary" @click="viewItem(item)">mdi-eye</v-icon>
                                        <v-icon class="mr-2" color="warning" @click="editItem(item)">mdi-pencil</v-icon>
                                        <v-icon color="red" @click="deleteItem(item)">mdi-delete</v-icon>
                                </div>
                        </template>
                </v-data-table>
        </v-container>
</template>

<script setup>
        import { ref, onMounted } from "vue";
        import api from "@/api/axios"; // Pastikan path benar
        import {  VSnackbar,VContainer,VDataTable, VIcon } from 'vuetify/components';
        import {useRouter} from "vue-router";

        // Snackbar Notifikasi
        const snackbar = ref({
                show: false,
                message: ""
        });

        const router = useRouter();


        // Header Tabel
        const headers = [
                { text: "Filename", key: "filename" },
                { text: "Actions", key: "actions", sortable: false }
        ];

        // Data Items
        const items = ref([]);

        // Fetch Data dari API saat Komponen Dipasang
        const fetchData = async () => {
                try {
                        const response = await api.post("/extract/list"); // Sesuaikan URL API
                        items.value = response.data.results;
                } catch (error) {
                        console.error("Error fetching data:", error);
                        snackbar.value.message = "Gagal mengambil data!";
                        snackbar.value.show = true;
                }
        };

        onMounted(fetchData); // Panggil saat komponen dimuat

        // Fungsi untuk Melihat Data
        const viewItem  = async (item) => {
                // Pastikan extracted_info berupa string JSON, lalu parse menjadi array
                let extractedInfoArray = [];
                try {
                        extractedInfoArray = JSON.parse(item.extracted_info);
                } catch (error) {
                        console.error("Error parsing extracted_info:", error);
                }

                // Bentuk data sesuai format yang diinginkan
                const formattedData = [
                        {
                                filename: item.filename,
                                extracted_info: extractedInfoArray
                        }
                ];
                router.push({
                        name: 'DetailListDocument',
                        query: { data: JSON.stringify(formattedData),aksi:1 }
                });
        };

        // Fungsi untuk Mengedit Data
        const editItem = (item) => {
                // Pastikan extracted_info berupa string JSON, lalu parse menjadi array
                let extractedInfoArray = [];
                try {
                        extractedInfoArray = JSON.parse(item.extracted_info);
                } catch (error) {
                        console.error("Error parsing extracted_info:", error);
                }

                // Bentuk data sesuai format yang diinginkan
                const formattedData = [
                        {
                                filename: item.filename,
                                extracted_info: extractedInfoArray
                        }
                ];
                router.push({
                        name: 'DetailListDocument',
                        query: { data: JSON.stringify(formattedData),aksi:2 }
                });
        };

        // Fungsi untuk Menghapus Data
        const deleteItem = async (item) => {
                if (confirm(`Are you sure you want to delete? ${item.filename}?`)) {
                        try {
                                await api.post("/extract/delete", { id: item.id }); // Sesuaikan endpoint delete
                                items.value = items.value.filter(i => i.id !== item.id);
                                snackbar.value.message = "Data deleted successfully!";
                                snackbar.value.show = true;
                        } catch (error) {
                                console.error("Error deleting data:", error);
                                snackbar.value.message = "Failed to delete data!";
                                snackbar.value.show = true;
                        }
                }
        };
</script>
