<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="edit-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">Edit Uploaded Data</v-card-title>
            <v-card-text>
                <template v-if="Object.keys(fileData).length">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    v-for="(value, key) in fileData"
                                    :key="key"
                                    v-model="fileData[key]"
                                    :label="key"
                                    outlined
                            ></v-text-field>
                        </v-col>
<!--                        <v-col cols="12" md="6">-->
<!--                            &lt;!&ndash; Select Box untuk memilih klaim &ndash;&gt;-->
<!--                            <v-select-->
<!--                                    v-model="selectedClaim"-->
<!--                                    :items="claims"-->
<!--                                    item-title="claimdesp"-->
<!--                                    item-value="id"-->
<!--                                    label="Select Claim"-->
<!--                                    outlined-->
<!--                                    return-object-->
<!--                            ></v-select>-->

<!--                            &lt;!&ndash; Select Box untuk memilih payment mode &ndash;&gt;-->
<!--                            <v-select-->
<!--                                    v-model="selectedPaymentMode"-->
<!--                                    :items="paymentModes"-->
<!--                                    item-title="paydesp"-->
<!--                                    item-value="id"-->
<!--                                    label="Select Payment Mode"-->
<!--                                    outlined-->
<!--                                    dense-->
<!--                                    return-object-->
<!--                            ></v-select>-->
<!--                        </v-col>-->
                    </v-row>

                    <!-- Wrapper untuk tombol -->
                    <div class="d-flex justify-space-between align-center mt-4">
                        <v-btn color="secondary" @click="saveChanges">
                            Back
                        </v-btn>

                        <v-btn color="primary" class="mx-2" @click="DialogClaim = true">
                            Select Claim
                        </v-btn>
                        <v-btn color="primary" class="mx-2" @click="DialogPaymentMode = true">
                            Select Payment Mode
                        </v-btn>
                        <v-btn color="red" :disabled="!selectedClaim" @click="saveChanges">
                            Post
                        </v-btn>
                    </div>
                </template>
                <v-alert v-else type="error" class="mt-2">
                    No data available to edit.
                </v-alert>
            </v-card-text>
        </v-card>

        <!-- Dialog Popup untuk Select Claim -->
        <v-dialog v-model="DialogClaim" max-width="500">
            <v-card>
                <v-card-title class="text-center text-h6">Select Claim</v-card-title>
                <v-card-text>
                    <v-select
                            v-model="selectedClaim"
                            :items="claims"
                            item-title="claimdesp"
                            item-value="id"
                            label="Select Claim"
                            outlined
                            dense
                            @update:modelValue="selectClaim"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Dialog Popup untuk Select Payment Mode -->
        <v-dialog v-model="DialogPaymentMode" max-width="500">
            <v-card>
                <v-card-title class="text-center text-h6">Select Payment Mode</v-card-title>
                <v-card-text>
                    <v-select
                            v-model="selectedPaymentMode"
                            :items="paymentModes"
                            item-title="paydesp"
                            item-value="id"
                            label="Select Payment Mode"
                            outlined
                            dense
                            @update:modelValue="selectPaymentMode"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
    import { ref, onMounted, nextTick } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import api from '@/api/axios';
    import { VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText, VTextField, VDialog, VSelect } from 'vuetify/components';

    const route = useRoute();
    const router = useRouter();
    const fileData = ref({});
    const claims = ref([]); // Data klaim
    const selectedClaim = ref(null); // Klaim yang dipilih
    const paymentModes = ref([]); // Data payment mode
    const selectedPaymentMode = ref(null); // Payment mode yang dipilih
    const DialogClaim = ref(false); // Status dialog popup
    const DialogPaymentMode = ref(false); // Status dialog popup

    // Ambil data dari query parameter saat halaman dimuat
    onMounted(async () => {
        try {
            if (route.query.data) {
                const parsedData = JSON.parse(route.query.data);
                Object.assign(fileData.value, parsedData); // Memastikan reaktivitas
                await nextTick(); // Tunggu Vue update DOM
                console.log('Data setelah diparse:', fileData.value);
            }
        } catch (error) {
            console.error('Error parsing data:', error);
            fileData.value = {}; // Default jika parsing gagal
        }

        // Fetch data klaim dari API
        fetchClaims();
        // Fetch data payment mode dari API
        fetchPaymentModes();
    });

    // Fungsi mengambil data klaim
    const fetchClaims = async () => {
        try {
            const response = await api.post('/endpoint/hrmilion/getclaimtype');
            console.log('Response API:', response.data); // Debugging untuk memastikan data yang diterima

            // Pastikan path menuju array data benar
            claims.value = response.data.claims.original.data.data;
        } catch (error) {
            console.error('Error fetching claims:', error);
        }
    };

    // Fungsi mengambil data payment mode
    const fetchPaymentModes = async () => {
        try {
            const response = await api.post('/endpoint/hrmilion/getpaymentmode');
            console.log('Response API Payment Mode:', response.data); // Debugging

            // Pastikan path menuju array data benar
            paymentModes.value = response.data.claims.original.data.data;
        } catch (error) {
            console.error('Error fetching payment modes:', error);
        }
    };

    // Fungsi memilih klaim dari dialog
    const selectClaim = (claim) => {
        selectedClaim.value = claim;
        DialogClaim.value = false; // Tutup dialog setelah memilih
    };
    const selectPaymentMode = (claim) => {
        selectedPaymentMode.value = claim;
        DialogPaymentMode.value = false; // Tutup dialog setelah memilih
    };

    // Fungsi untuk menyimpan perubahan
    const saveChanges = () => {
        router.push('/upload_data');
    };
</script>

<style scoped>
    .edit-card {
        width: 800px;
        padding: 30px;
        border-radius: 16px;
    }
    .cursor-pointer {
        cursor: pointer;
    }
</style>
