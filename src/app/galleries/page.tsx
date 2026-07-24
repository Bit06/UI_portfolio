import fs from 'fs';
import path from 'path';
import ContinuousGallery, { GallerySection, GalleryProject } from '@/components/ContinuousGallery';
import FloatingDock from '@/components/FloatingDock';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galleries - David Oloniyo",
  description: "A continuous flow of selected works, landing pages, and dashboard designs.",
};

// Next.js App Router allows Node.js APIs in server components
function getDynamicGallerySections(): GallerySection[] {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
    
    // Read all valid images
    let files: string[] = [];
    try {
        files = fs.readdirSync(galleryDir).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));
    } catch (e) {
        console.error("Could not read gallery directory", e);
        return [];
    }

    const projectsMap = new Map<string, GalleryProject>();

    for (const file of files) {
        const lowerFile = file.toLowerCase();
        let projectName = "";
        let category = "";

        if (lowerFile.includes('(landing page)')) {
            category = "Landing Page";
            projectName = file.substring(0, lowerFile.indexOf('(landing page)')).replace(/-*\s*$/, '').trim();
        } else if (lowerFile.includes('(dashboard)') || lowerFile.includes('(dashbaord)')) {
            category = "Dashboard";
            const idx = lowerFile.includes('(dashboard)') ? lowerFile.indexOf('(dashboard)') : lowerFile.indexOf('(dashbaord)');
            projectName = file.substring(0, idx).replace(/-*\s*$/, '').trim();
        } else if (lowerFile.includes('(mobile)')) {
            category = "Mobile";
            projectName = file.substring(0, lowerFile.indexOf('(mobile)')).replace(/-*\s*$/, '').trim();
        } else {
            // Ignore files that don't match the standard pattern to avoid duplicates (like kebab-case versions)
            continue;
        }

        if (!projectName || !category) continue;

        const projectId = `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const fullProjectName = `${projectName} (${category})`;

        if (!projectsMap.has(projectId)) {
            projectsMap.set(projectId, {
                id: projectId,
                name: fullProjectName,
                images: []
            });
        }

        // Generate a clean title for the image alt text
        const baseNameMatch = file.match(/^(.*?)\s*-\s*\((.*?)\)\s*(.*?)\.(webp|png|jpg|jpeg)$/i);
        let title = "";
        if (baseNameMatch && baseNameMatch[3]) {
            title = baseNameMatch[3].trim();
        }

        projectsMap.get(projectId)!.images.push({
            srcUrl: `/images/gallery/${encodeURIComponent(file)}`,
            alt: title ? `${projectName} - (${category}) ${title}` : `${projectName} - (${category})`
        });
    }

    const landingPagesSection: GallerySection = {
        id: 'landing-pages',
        title: 'LANDING PAGES',
        projects: []
    };
    const dashboardMobileSection: GallerySection = {
        id: 'dashboard-mobile',
        title: 'DASHBOARD & MOBILE',
        projects: []
    };

    for (const project of projectsMap.values()) {
        if (project.name.toLowerCase().includes('landing page')) {
            landingPagesSection.projects.push(project);
        } else {
            dashboardMobileSection.projects.push(project);
        }
    }

    // Sort projects alphabetically to ensure consistent rendering
    landingPagesSection.projects.sort((a, b) => a.name.localeCompare(b.name));
    dashboardMobileSection.projects.sort((a, b) => a.name.localeCompare(b.name));

    return [landingPagesSection, dashboardMobileSection];
}

export default function GalleriesPage() {
    const sections = getDynamicGallerySections();

    return (
        <main className="w-full h-[100vh] bg-[#050505] text-white overflow-hidden">
            <ContinuousGallery sections={sections} />
            <FloatingDock />
        </main>
    );
}
