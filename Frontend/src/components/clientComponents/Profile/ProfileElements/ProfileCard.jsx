import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  HiOutlineMail,
  HiOutlineLink,
  HiOutlineCalendar,
  HiOutlinePencil,
} from "react-icons/hi";
import ProfileForm from "@/components/profilFormComponents/ProfileForm";

function ProfileCard({ profile, onSubmitProfile, loading }) {
  if (!profile) return null;

  // 🎯 icon style واحد
  const iconClass = "text-gray-500";
  const iconSize = 18;

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-100">
      <CardContent className="p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              {profile.professionalTitle?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.professionalTitle}
              </h2>

              <Badge variant="secondary" className="mt-1">
                User ID: {profile.userId}
              </Badge>
            </div>
          </div>

          {/* Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-xl flex items-center gap-2"
              >
                <HiOutlinePencil size={18} className="text-gray-600" />
                Edit
              </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-5xl   ">
              <DialogHeader>
              </DialogHeader>

              <ProfileForm
                initialData={profile}
                onSubmitProfile={onSubmitProfile}
                loading={loading}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-3 text-gray-600">
          <HiOutlineMail size={iconSize} className={iconClass} />
          <span>{profile.contact}</span>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">
            Bio
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {profile.summary}
          </p>
        </div>

        {/* External Links */}
        {profile.externalLinks && (
          <div className="flex items-center gap-3 text-blue-600 break-all">
            <HiOutlineLink size={iconSize} className="text-blue-500" />
            <a
              href={profile.externalLinks}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {profile.externalLinks}
            </a>
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-1 text-xs text-gray-500 pt-4 border-t">
          <div className="flex items-center gap-2">
            <HiOutlineCalendar size={14} className={iconClass} />
            <span>
              Créé le: {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineCalendar size={14} className={iconClass} />
            <span>
              Mis à jour: {new Date(profile.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

export default ProfileCard;