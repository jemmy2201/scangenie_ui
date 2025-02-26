<template>
    <v-container class="fill-height d-flex justify-center align-center">
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
                        <v-btn color="secondary" @click="saveChanges">
                            Back
                        </v-btn>

<!--                        <v-btn color="primary" class="mx-2" @click="DialogClaim = true">-->
<!--                            Select Claim-->
<!--                        </v-btn>-->
<!--                        <v-btn color="primary" class="mx-2" @click="DialogPaymentMode = true">-->
<!--                            Select Payment Mode-->
<!--                        </v-btn>-->
                        <v-btn color="red"  @click="saveChanges">
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
    import { useRoute } from 'vue-router';
    import { VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText, VTextField } from 'vuetify/components';

    const route = useRoute();
    // const router = useRouter();
    const invoices = ref([]);

    onMounted(() => {
        try {
            if (route.query.data) {
                invoices.value = JSON.parse(route.query.data);
            }
        } catch (error) {
            console.error('Error parsing invoice data:', error);
            invoices.value = [];
        }
    });

    const saveChanges = () => {
        console.log('Updated Invoices:', invoices.value);
        // Implementasikan logika penyimpanan di sini
    };
</script>

<style scoped>
    .edit-card {
        width: 800px;
        padding: 30px;
        border-radius: 16px;
    }
</style>
