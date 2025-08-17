#!/bin/bash

# Script to help move images to the correct locations
# Make this file executable with: chmod +x move-images.sh

echo "🖼️  Image Setup Helper"
echo "====================="

# Check if the image directories exist
if [ ! -d "public/images/bestfriend" ]; then
    echo "Creating bestfriend directory..."
    mkdir -p public/images/bestfriend
fi

if [ ! -d "public/images/family" ]; then
    echo "Creating family directory..."
    mkdir -p public/images/family
fi

echo ""
echo "📁 Looking for image folders..."

# Function to move and rename images
move_and_rename() {
    local source_dir="$1"
    local dest_dir="$2"
    local prefix="$3"
    
    if [ -d "$source_dir" ]; then
        echo "Found $source_dir"
        counter=1
        for file in "$source_dir"/*; do
            if [[ -f "$file" && "$file" =~ \.(jpg|jpeg|png|gif|webp)$ ]]; then
                extension="${file##*.}"
                new_name="${prefix}${counter}.${extension}"
                cp "$file" "$dest_dir/$new_name"
                echo "  Copied $(basename "$file") → $new_name"
                ((counter++))
            fi
        done
        echo "  ✅ Moved $((counter-1)) images to $dest_dir"
    else
        echo "❌ Directory $source_dir not found"
        echo "   Please manually copy your images to $dest_dir"
        echo "   Name them as ${prefix}1.jpg, ${prefix}2.jpg, etc."
    fi
}

# Look for common folder names and move images
echo ""
echo "🔍 Searching for image folders..."

# Check for bestfriend/thor folders
for dir in "bestfriend" "thor" "best-friend" "bestfriend-thor" "Thor"; do
    if [ -d "$dir" ]; then
        echo "Found Thor/bestfriend images in: $dir"
        move_and_rename "$dir" "public/images/bestfriend" "thor"
        break
    fi
done

# Check for family folders  
for dir in "family" "Family" "family-photos" "family_photos"; do
    if [ -d "$dir" ]; then
        echo "Found family images in: $dir"
        move_and_rename "$dir" "public/images/family" "family"
        break
    fi
done

echo ""
echo "📊 Current image status:"
echo "Thor photos: $(ls public/images/bestfriend/*.* 2>/dev/null | wc -l) files"
echo "Family photos: $(ls public/images/family/*.* 2>/dev/null | wc -l) files"

echo ""
echo "🚀 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Visit http://localhost:3000 to see your photo galleries"
echo "3. If you need to add more images, copy them to:"
echo "   - public/images/bestfriend/ (name them thor1.jpg, thor2.jpg, etc.)"
echo "   - public/images/family/ (name them family1.jpg, family2.jpg, etc.)"

echo ""
echo "✨ Photo galleries are ready!"
