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
                        <template v-slot:item.actions="{ item }">
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

        // Snackbar Notifikasi
        const snackbar = ref({
                show: false,
                message: ""
        });

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
                        console.log("Data diterima:", JSON.stringify(items.value, null, 2));
                } catch (error) {
                        console.error("Error fetching data:", error);
                        snackbar.value.message = "Gagal mengambil data!";
                        snackbar.value.show = true;
                }
        };

        onMounted(fetchData); // Panggil saat komponen dimuat

        // Fungsi untuk Melihat Data
        const viewItem = (item) => {
                snackbar.value.message = `Melihat: ${item.filename}`;
                snackbar.value.show = true;
        };

        // Fungsi untuk Mengedit Data
        const editItem = (item) => {
                snackbar.value.message = `Mengedit: ${item.filename}`;
                snackbar.value.show = true;
        };

        // Fungsi untuk Menghapus Data
        const deleteItem = async (item) => {
                if (confirm(`Yakin ingin menghapus ${item.filename}?`)) {
                        try {
                                await api.post("/extract/delete", { id: item.id }); // Sesuaikan endpoint delete
                                items.value = items.value.filter(i => i.id !== item.id);
                                snackbar.value.message = "Data berhasil dihapus!";
                                snackbar.value.show = true;
                        } catch (error) {
                                console.error("Error deleting data:", error);
                                snackbar.value.message = "Gagal menghapus data!";
                                snackbar.value.show = true;
                        }
                }
        };
</script>
