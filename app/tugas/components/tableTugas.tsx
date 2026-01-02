"use client"

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

const tugas = [
  {
    matkul: "Pemrograman Web",
    judul: "Landing Page Portfolio",
    tanggal: "2026-01-02",
    jam: "23:59",
  },
  {
    matkul: "Statistika",
    judul: "Analisis Data Kelompok",
    tanggal: "2026-01-03",
    jam: "20:00",
  },
  {
    matkul: "Basis Data",
    judul: "Normalisasi Database",
    tanggal: "2026-01-01",
    jam: "18:00",
  },
]

const today = new Date().toISOString().split("T")[0]
const todayDate = new Date()

const isOverdue = (tanggal: string, jam: string) => {
  const deadline = new Date(`${tanggal}T${jam}`)
  return deadline < new Date()
}

const getDaysLeft = (tanggal: string, jam: string) => {
  const deadline = new Date(`${tanggal}T${jam}`)
  const diffTime = deadline.getTime() - todayDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export default function TableTugas() {
  const [matkulFilter, setMatkulFilter] = useState("Semua")

  const matkulList = ["Semua", ...new Set(tugas.map(t => t.matkul))]

  const filteredTugas =
    matkulFilter === "Semua"
      ? tugas
      : tugas.filter(t => t.matkul === matkulFilter)

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="w-56">
        <Select value={matkulFilter} onValueChange={setMatkulFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter Mata Kuliah" />
          </SelectTrigger>
          <SelectContent>
            {matkulList.map(matkul => (
              <SelectItem key={matkul} value={matkul}>
                {matkul}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mata Kuliah</TableHead>
            <TableHead>Judul Tugas</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Jam</TableHead>
            <TableHead>Sisa Waktu</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredTugas.map((item, index) => {
            const overdue = isOverdue(item.tanggal, item.jam)
            const daysLeft = getDaysLeft(item.tanggal, item.jam)
            const todayDeadline = daysLeft === 0

            return (
              <TableRow
                key={index}
                className={
                  overdue
                    ? "bg-destructive/10"
                    : todayDeadline
                    ? "bg-primary/10"
                    : daysLeft <= 7
                    ? "bg-yellow-500/10"
                    : ""
                }
              >
                <TableCell>{item.matkul}</TableCell>
                <TableCell className="font-medium">
                  {item.judul}
                </TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.jam}</TableCell>

                {/* Sisa Waktu */}
                <TableCell>
                  {overdue
                    ? "Terlambat"
                    : todayDeadline
                    ? "Hari ini"
                    : daysLeft <= 7
                    ? `${daysLeft} hari lagi`
                    : "Aman"}
                </TableCell>

                {/* Status */}
                <TableCell
                  className={
                    overdue
                      ? "text-destructive font-semibold"
                      : todayDeadline
                      ? "text-primary font-medium"
                      : daysLeft <= 7
                      ? "text-yellow-600 font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {overdue
                    ? "Terlambat"
                    : todayDeadline
                    ? "Hari Ini"
                    : daysLeft <= 7
                    ? "Mendekati Deadline"
                    : "Aman"}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
