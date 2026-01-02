"use client";

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const hariIndonesia = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
]

const jadwal = [
  {
    kelas: "4A",
    matkul: "Pemrograman Web",
    sks: 3,
    hari: "Senin",
    jam: "08.00 - 10.30",
  },
  {
    kelas: "4A",
    matkul: "Statistika",
    sks: 2,
    hari: "Selasa",
    jam: "10.00 - 11.40",
  },
  {
    kelas: "4B",
    matkul: "Basis Data",
    sks: 3,
    hari: "Rabu",
    jam: "13.00 - 15.30",
  },
]


const today = hariIndonesia[new Date().getDay()]

export default function TableJadwal() {
  const [kelasFilter, setKelasFilter] = useState("Semua")

  const kelasList = ["Semua", ...new Set(jadwal.map(j => j.kelas))]

  const filteredJadwal =
    kelasFilter === "Semua"
      ? jadwal
      : jadwal.filter(j => j.kelas === kelasFilter)

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="w-48">
        <Select value={kelasFilter} onValueChange={setKelasFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            {kelasList.map(kelas => (
              <SelectItem key={kelas} value={kelas}>
                {kelas}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kelas</TableHead>
            <TableHead>Mata Kuliah</TableHead>
            <TableHead>SKS</TableHead>
            <TableHead>Hari</TableHead>
            <TableHead>Jam</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJadwal.map((item, index) => (
            <TableRow
              key={index}
              className={
                item.hari === today
                  ? "bg-primary/10 font-medium"
                  : ""
              }
            >
              <TableCell>{item.kelas}</TableCell>
              <TableCell>{item.matkul}</TableCell>
              <TableCell>{item.sks}</TableCell>
              <TableCell>{item.hari}</TableCell>
              <TableCell>{item.jam}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
