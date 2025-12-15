import { Button } from '../ui/button';

const pagination = ({ page, totalPages, onPageChange }: {
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}) => {
    return (
        <div className="flex items-center justify-between gap-2 py-4 flex-wrap">
            <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                    Previous
                </Button>
                <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default pagination