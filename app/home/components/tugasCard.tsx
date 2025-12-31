"use client";

import * as React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JadwalCard() {
  const [position, setPosition] = React.useState("bottom");

  const tugas = [
    {
      hari: "Kamis",
      tanggal: "12 Agustus 2025",
      jam: "12:30",
      matkul: "Penambangan Data",
    },
    {
      hari: "Kamis",
      tanggal: "12 Agustus 2025",
      jam: "12:30",
      matkul: "Penambangan Data",
    },
    {
      hari: "Kamis",
      tanggal: "12 Agustus 2025",
      jam: "12:30",
      matkul: "Penambangan Data",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Jadwal Tugas</CardTitle>
        <CardDescription>Kerjain Tugasmu Cok</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="w-30">
                Hari Ini
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Pilih Rentang Waktu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="hariini">
                  Hari Ini
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="mingguini">
                  1 Minggu
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="semua">
                  Semua
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="gap-2 flex flex-col">
        {tugas.map((item, index) => (
          <div
            key={index}
            className="flex flex-row w-full justify-between border-b pb-2"
          >
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-md">
                {item.hari}, {item.tanggal}
              </h1>
              <p className="text-sm">{item.matkul}</p>
            </div>
            <p>{item.jam} WIB</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
