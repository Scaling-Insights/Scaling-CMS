import Tag from "@/app/components/misc/Tag";
import Icon from "@/app/components/misc/Icon";
import { PublicationStatus } from "@/enums/PublicationStatus";
import { ISingleContentItem } from "@/interfaces/ISingleContentItem";
import { convertDateFormatToLongNL, convertDateFormatToShortNL } from "@/services/DateService";


const ContentItem: React.FC<ISingleContentItem> = (props) => {
    const thumbnailLink = props.thumbnailLink != "" ? props.thumbnailLink : "/images/placeholder.webp";

    return (
        <>
            <div className="grid grid-cols-12 border-b-2 border-gray-300 mt-1 py-1 min-h-32">
                {/* Image (always on the left) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-1 px-2 pb-1 flex items-center">
                    <div className="flex justify-center">
                        <img className="rounded-md max-h-56 xl:max-h-32 shadow-md" src={thumbnailLink} alt="Placeholder" />
                    </div>
                </div>

                {/* Main Content (stacks on mobile, inline on larger screens) */}
                <div className="col-span-8 lg:col-span-10">
                    <div className="grid grid-cols-1 lg:grid-cols-10">
                        {/* Title */}
                        <div className="lg:col-span-2 lg:p-1 lg:px-2">
                            <p className="text-md font-semibold truncate break-words whitespace-nowrap lg:whitespace-normal">
                                {props.title}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-5 lg:p-1 lg:px-2">
                            <p className="text-md line-clamp-3 lg:line-clamp-5 truncate break-words whitespace-nowrap lg:whitespace-normal">
                                {props.description}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="lg:col-span-2 lg:p-1 lg:px-2 overflow-hidden">
                            <div className="flex flex-wrap gap-1">
                                {props.tags.map((tag) => (
                                    <Tag key={tag} name={tag} />
                                ))}
                            </div>
                        </div>

                        {/* Date */}
                        <div className="lg:col-span-1 lg:p-1 lg:px-2">
                            <p className="lg:hidden 2xl:block">{convertDateFormatToLongNL(props.createdAt)}</p>
                            <p className="hidden lg:block 2xl:hidden">{convertDateFormatToShortNL(props.createdAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Lock Icon (always on the right) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:p-1 lg:px-2 flex items-center justify-end">
                    <div className="flex justify-end">
                        {props.publicationStatus == PublicationStatus.PUBLIC ? (
                            <Icon name="bx-lock-open-alt" color="public-color" />
                        ) : (
                            <Icon name="bx-lock-alt" color="private-color" />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContentItem;
