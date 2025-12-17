import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IUserInfo } from "@/types/user.interface";

// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
//   bio?: string;
//   image?: string;
//   interests?: string[];
//   hobbies?: string[];
//   location?: string;
//   role: string;
//   userStatus: string;
//   createdAt: string;
// }

interface UserInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUserInfo | null;
}

export default function UserInfoModal({ open, onOpenChange, user }: UserInfoModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">User Information</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="shrink-0 flex justify-center md:justify-start">
            <div className="relative h-28 w-28 rounded-full overflow-hidden border">
              <Image
                src={user.image || "/placeholder-user.png"}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            {user.bio && (
              <p className="text-sm leading-relaxed">{user.bio}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium">Location:</span> {user.location || "N/A"}
              </div>
              <div>
                <span className="font-medium">Joined:</span>{" "}
                {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Role:</span>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge>{user.userStatus}</Badge>
              </div>
            </div>

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {user.hobbies && user.hobbies.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Hobbies</p>
                <div className="flex flex-wrap gap-2">
                  {user.hobbies.map((hobby, index) => (
                    <Badge key={index} variant="outline">
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/*
USAGE EXAMPLE:

const [open, setOpen] = useState(false);
const user = { ...API USER DATA };

<UserInfoModal open={open} onOpenChange={setOpen} user={user} />
*/
