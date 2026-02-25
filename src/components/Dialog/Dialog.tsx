import {
    memo,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useState,
    useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { StyledDialogContainer } from './DialogStyles';
import { useEscape } from 'src/hooks/useEscape';

interface DialogProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    anchor: HTMLElement | null;
    className?: string;
}

const Dialog = memo(
    ({ children, isOpen, onClose, anchor, className }: DialogProps) => {
        const [coords, setCoords] = useState({ top: 0, left: 0 });
        const [isVisible, setIsVisible] = useState(false);
        const dialogRef = useRef<HTMLDivElement>(null);

        useEscape(() => {
            onClose();
        });

        const updatePosition = () => {
            if (!anchor || !dialogRef.current) return;

            const anchorRect = anchor.getBoundingClientRect();
            const dialogRect = dialogRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let top = anchorRect.bottom + 8;
            let left = anchorRect.left;

            // Vertical collision detection
            if (top + dialogRect.height > viewportHeight) {
                // Flip to top if no space at bottom
                top = anchorRect.top - dialogRect.height - 8;
            }

            // Horizontal collision detection
            if (left + dialogRect.height > viewportWidth) {
                left = viewportWidth - dialogRect.width - 10;
            }

            if (left < 10) {
                left = 10;
            }

            setCoords({ top, left });
            setIsVisible(true);
        };

        useLayoutEffect(() => {
            if (isOpen && anchor) {
                updatePosition();
            } else {
                setIsVisible(false);
            }
        }, [isOpen, anchor]);

        useEffect(() => {
            if (!isOpen) return;

            const handleResize = () => updatePosition();
            const handleScroll = () => updatePosition();

            const handleClickOutside = (event: MouseEvent) => {
                if (
                    dialogRef.current &&
                    !dialogRef.current.contains(event.target as Node) &&
                    anchor &&
                    !anchor.contains(event.target as Node)
                ) {
                    onClose();
                }
            };

            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleScroll, true);
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleScroll, true);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [isOpen, anchor, onClose]);

        if (!isOpen) return null;

        return createPortal(
            <StyledDialogContainer
                ref={dialogRef}
                $top={coords.top}
                $left={coords.left}
                $isVisible={isVisible}
                className={className}
            >
                {children}
            </StyledDialogContainer>,
            document.body,
        );
    },
);

export default Dialog;
