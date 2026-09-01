import { Star, MapPin, Bell, Navigation } from 'lucide-react';
import Badge from '../../components/common/Badge';

export default function BranchHero({ branch }) {
    return (
        <div className="relative h-72 sm:h-96 overflow-hidden bg-slate-800">
            <img
                src={branch.image}
                alt={branch.name}
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="primary">{branch.category}</Badge>
                                <Badge variant="glass">
                                    <Star size={11} className="fill-amber-500 text-amber-500" />
                                    {branch.rating} · {branch.reviewsCount} reviews
                                </Badge>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                                {branch.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={14} />
                                    {branch.address}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${branch.isOpenNow ? "bg-green-400" : "bg-red-400"} `} />
                                    {branch.statusText}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition-colors">
                                <Bell size={15} /> Follow
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition-colors">
                                <Navigation size={15} /> Directions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}