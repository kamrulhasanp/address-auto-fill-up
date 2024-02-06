"use client"
import GoogleMapAutoPlace from "@/public/GoogleMapAutoPlace";
import PostcodeLookup from "@/public/PostCodeLookUp";
import MyApp from "@/public/_page";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
      <PostcodeLookup />
    
    </main>
  );
}
