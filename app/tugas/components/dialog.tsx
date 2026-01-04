"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Calendar28 from "./datePicker"; 

const matkulList = [
  "Pemrograman Web",
  "Statistika",
  "Basis Data",
]

export default function DialogTable() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Jadwal</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Jadwalmu</DialogTitle>
          <DialogDescription>
            Jangan ditunda, deadline bukan mantan.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="judul">Judul Tugas</Label>
            <Input id="judul" placeholder="Contoh: Tugas Akhir" />
          </div>

          <div className="grid gap-2">
            <Label>Mata Kuliah</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Mata Kuliah" />
              </SelectTrigger>
              <SelectContent>
                {matkulList.map((matkul) => (
                  <SelectItem key={matkul} value={matkul}>
                    {matkul}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Calendar28 />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="jam">Jam Deadline</Label>
            <Input type="time" id="jam"/>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
