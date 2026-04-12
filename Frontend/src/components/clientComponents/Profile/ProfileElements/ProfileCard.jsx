import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  HiOutlineMail,
  HiOutlineLink,
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlinePhone,
} from "react-icons/hi";
import ProfileForm from "@/components/profilFormComponents/ProfileForm";
import ProfileEditForm from "@/components/profilFormComponents/editForms/ProfileEditForm";

function ProfileCard({ user, setUserData, profile }) {
  const [open, setOpen] = useState(false);
  if (!profile || !user) return null;



  return (
<Card className="rounded-2xl  border  h-full flex flex-col">
  <CardContent className="p-6 flex flex-col h-full">

    {/* 🔝 HEADER */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
          {user.firstName?.charAt(0).toUpperCase()}
        </div>

        {/* Name + Title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500">
            {profile.professionalTitle}
          </p>
        </div>
      </div>

      {/* Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HiOutlinePencil size={18} className="text-gray-600" />
          </Button>
        </DialogTrigger>

        <DialogContent className="!max-w-5xl">
          <DialogHeader />
          <ProfileEditForm
            profile={profile}
            setUserData={setUserData}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>

    {/* 🪪 BADGE */}
    <div className="mt-4">
      <Badge variant="secondary">User ID: {profile.userId}</Badge>
    </div>

    {/* 📩 CONTACT INFO */}
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">

      <div className="flex items-center gap-2">
        <HiOutlineMail size={16} />
        <span className="truncate">{user.email}</span>
      </div>

      {profile.contact && (
        <div className="flex items-center gap-2">
          <HiOutlinePhone size={16} />
          <span>{profile.contact}</span>
        </div>
      )}

      {profile.externalLinks && (
        <div className="flex items-center gap-2 col-span-full text-blue-600">
          <HiOutlineLink size={16} />
          <a
            href={
              profile.externalLinks.startsWith("http")
                ? profile.externalLinks
                : `https://${profile.externalLinks}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:underline"
          >
            {profile.externalLinks}
          </a>
        </div>
      )}
    </div>

    {/* 🧠 BIO */}
    <div className="mt-6 flex-1">
      <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
        Bio
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
        {profile.summary}
      </p>
    </div>

    {/* 📅 FOOTER */}
    <div className="mt-6 pt-4 border-t text-xs text-gray-500 space-y-1">
      <div className="flex items-center gap-2">
        <HiOutlineCalendar size={14} />
        <span>
          Account: {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <HiOutlineCalendar size={14} />
        <span>
          Profile: {new Date(profile.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <HiOutlineCalendar size={14} />
        <span>
          Updated: {new Date(profile.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>

  </CardContent>
</Card>
  );
}

export default ProfileCard;