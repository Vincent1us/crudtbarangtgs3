"use client";

import Modal from "@/components/modal";
import { TambahBarang } from "@/services/barang";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const FormBarang = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [namabarang, setNamabarang] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga, setHarga] = useState(0);
    const [stok, setStok] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            toast("Please select an image", {
                hideProgressBar: true,
                containerId: `UploadID`,
                type: "error",
                autoClose: 3000
            });
            return;
        }

        const formData = new FormData();
        formData.append("nama_barang", namabarang);
        formData.append("deskripsi", deskripsi);
        formData.append("harga", harga.toString());
        formData.append("stok", stok.toString());
        formData.append("image", image);

        const response = await TambahBarang(formData);

        if (response.status) {
            toast(response.message, {
                hideProgressBar: true,
                containerId: `UploadID`,
                type: "success",
                autoClose: 2000
            });
            setIsOpen(false);
            router.refresh();
        } else {
            toast(response.message, {
                hideProgressBar: true,
                containerId: `UploadID`,
                type: "error",
                autoClose: 3000
            });
        }
    };

    return (
        <div>
            {/* tombol beda dari tabel */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-[#5e4312] text-white py-2 px-4 rounded-lg 
                hover:bg-[#cdb892] transition"
            >
                Tambah Barang
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Tambah Barang"
                
            >

                {/* LANGSUNG BACKGROUND CREAM (NO LAPISAN) */}
                <div className="bg-[#f4ecd8] p-6 rounded-2xl">

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-[#2f4f4f] mb-1 font-medium">
                                Nama Barang
                            </label>
                            <input
                                value={namabarang}
                                onChange={(e) => setNamabarang(e.target.value)}
                                type="text"
                                className="w-full p-3 rounded-lg 
                                bg-[#f9f4e7] border border-[#cdb892]
                                focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
                            />
                        </div>

                        <div>
                            <label className="block text-[#2f4f4f] mb-1 font-medium">
                                Deskripsi
                            </label>
                            <textarea
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                className="w-full p-3 rounded-lg 
                                bg-[#f9f4e7] border border-[#cdb892]
                                focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
                            />
                        </div>

                        <div>
                            <label className="block text-[#2f4f4f] mb-1 font-medium">
                                Harga
                            </label>
                            <input
                                type="number"
                                value={harga}
                                onChange={(e) => setHarga(Number(e.target.value))}
                                className="w-full p-3 rounded-lg 
                                bg-[#f9f4e7] border border-[#cdb892]
                                focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
                            />
                        </div>

                        <div>
                            <label className="block text-[#2f4f4f] mb-1 font-medium">
                                Stok
                            </label>
                            <input
                                type="number"
                                value={stok}
                                onChange={(e) => setStok(Number(e.target.value))}
                                className="w-full p-3 rounded-lg 
                                bg-[#f9f4e7] border border-[#cdb892]
                                focus:outline-none focus:ring-2 focus:ring-[#5d9696]"
                            />
                        </div>

                        {/* UPLOAD GAMBAR (DASHED BOX) */}
                        <div>
                            <label className="block text-[#2f4f4f] mb-2 font-medium">
                                Upload Gambar
                            </label>

                            <label className="flex items-center justify-center 
                            w-full p-6 cursor-pointer rounded-lg
                            border-2 border-dashed border-[#cdb892]
                            bg-[#f9f4e7] hover:bg-[#efe4c9] transition">

                                <span className="text-[#5a4633] text-sm">
                                    {image ? image.name : "Klik untuk pilih gambar"}
                                </span>

                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target.files?.[0] || null)
                                    }
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2f4f4f] text-white py-3 rounded-lg 
                            hover:bg-[#3f6f6f] transition"
                        >
                            Simpan
                        </button>

                    </form>
                </div>

            </Modal>
        </div>
    );
};

export default FormBarang;