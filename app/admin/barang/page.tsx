import { URL_IMAGE } from "@/global";
import { GetBarang } from "@/services/barang"
import { FormBarang } from "./formbarang";

const BarangPage = async () => {
    const { data } = await GetBarang()
    console.log(data)

    return (
        <div className="min-h-screen p-8 
        bg-gradient-to-t ">

            <h1 className="text-3xl font-bold text-center mb-6 text-[#2f4f4f]">
                Kelola Barang
            </h1>

            <div className="mb-6">
                <FormBarang />
            </div>

            <table className="w-full border-collapse">

                <thead>
                    <tr className="bg-[#2f4f4f] text-white">
                        <th className="p-3">Nama Barang</th>
                        <th className="p-3">Harga</th>
                        <th className="p-3">Stok</th>
                        <th className="p-3">Image</th>
                        <th className="p-3">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.length > 0 ? data.map((item) => (
                        <tr 
                            key={item.id}
                            className="text-center border-b border-[#d6c3a3] 
                            bg-transparent hover:bg-[#cfe3df]/40 transition"
                        >
                            <td className="p-3 text-[#2f4f4f] font-medium">
                                {item.nama_barang}
                            </td>

                            <td className="p-3 text-[#5a4633]">
                                Rp {item.harga}
                            </td>

                            <td className="p-3 text-[#5a4633]">
                                {item.stok}
                            </td>

                            <td className="p-3">
                                <img 
                                    src={`${URL_IMAGE}/${item.image}`} 
                                    alt={item.image} 
                                    width={100}
                                    className="rounded-lg mx-auto"
                                />
                            </td>

                            <td className="p-3 space-x-2">
                                <button className="bg-[#5d9696] text-white px-3 py-1 rounded hover:bg-[#4a7c7c]">
                                    Edit
                                </button>

                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="text-center p-5 text-gray-600">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
}

export default BarangPage;