// lib/content/siteConfig.ts - Site configuration loader
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { SiteData, HeroConfig, SiteConfig } from './types';
import { getImagePath } from '@/lib/utils/image';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Load and process site configuration
 */
export function getSiteConfig(): SiteData {
  const filePath = path.join(contentDirectory, 'site.yml');
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const rawData = yaml.load(fileContents) as any;
    
    // Build hero configuration with proper defaults
    const heroConfig: HeroConfig = {
      backgroundImage: rawData.site?.hero?.backgroundImage || "",
      fallbackGradient: rawData.site?.hero?.fallbackGradient || "from-yellow-100 via-pink-100 to-blue-100",
      logoEnhancement: {
        dropShadow: rawData.site?.hero?.logoEnhancement?.dropShadow !== false,
        shadowIntensity: rawData.site?.hero?.logoEnhancement?.shadowIntensity || 'medium',
        shadowColor: rawData.site?.hero?.logoEnhancement?.shadowColor || 'rgba(0, 0, 0, 0.3)',
      },
      overlay: {
        enabled: rawData.site?.hero?.overlay?.enabled !== false,
        type: rawData.site?.hero?.overlay?.type || 'gradient',
        solid: rawData.site?.hero?.overlay?.solid || "rgba(0, 0, 0, 0.4)",
        gradient: rawData.site?.hero?.overlay?.gradient || "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
      },
      textOptimization: {
        useWhiteText: rawData.site?.hero?.textOptimization?.useWhiteText || false,
        addTextShadow: rawData.site?.hero?.textOptimization?.addTextShadow || false,
        enhanceContrast: rawData.site?.hero?.textOptimization?.enhanceContrast || false,
        shadowIntensity: rawData.site?.hero?.textOptimization?.shadowIntensity || 'medium',
      },
      title: rawData.site?.hero?.title || "PENTASUS",
      subtitle: rawData.site?.hero?.subtitle || "Champions on water, friends for life",
      description: rawData.site?.hero?.description || "United by tradition, driven by excellence.",
    };

    // Add carousel configuration if present
    if (rawData.site?.hero?.carousel) {
      heroConfig.carousel = {
        autoPlay: rawData.site.hero.carousel.autoPlay !== false,
        imageDuration: rawData.site.hero.carousel.imageDuration || 5,
        pauseOnHover: rawData.site.hero.carousel.pauseOnHover !== false,
        media: rawData.site.hero.carousel.media || []
      };
    }

    const siteConfig: SiteConfig = {
      name: rawData.site?.name || "PENTASUS",
      tagline: rawData.site?.tagline || "Champions on water, friends for life",
      description: rawData.site?.description || "United by tradition, driven by excellence.",
      logo: getImagePath("/images/logo/pentasus-logo.png"),
      logoFallback: rawData.site?.logoFallback || "waves",
      favicon: getImagePath("/images/logo/pentasus-logo.png"),
      wechatBlogUrl: rawData.site?.wechatBlogUrl || "https://mp.weixin.qq.com/s/pentasus-dragon-boat-journey",
      hero: heroConfig
    };

    return buildSiteData(siteConfig, rawData);
    
  } catch (error) {
    console.warn('Could not load site.yml, using defaults:', error);
    return getFallbackSiteData();
  }
}

/**
 * Build complete site data object
 */
function buildSiteData(siteConfig: SiteConfig, rawData: any): SiteData {
  return {
    site: siteConfig,
    navigation: rawData.navigation || getDefaultNavigation(),
    universities: rawData.universities?.map((uni: any) => ({
      ...uni,
      logo: getImagePath(uni.logo)
    })) || getDefaultUniversities(),
    contact: rawData.contact || getDefaultContact()
  };
}

/**
 * Get default navigation items
 */
function getDefaultNavigation() {
  return [
    { name: "Home", href: "#home" },
    { name: "Athletes", href: "#athletes" },
    { name: "Admin", href: "#admin" },
    { name: "News", href: "#news" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Contact", href: "#contact" }
  ];
}

/**
 * Get default university data
 */
function getDefaultUniversities() {
  return [
    { name: "Fudan University", logo: getImagePath("/images/alumni/fudan.webp") },
    { name: "Tongji University", logo: getImagePath("/images/alumni/tongji.webp") },
    { name: "Shanghai University of Finance and Economics", logo: getImagePath("/images/alumni/caijin.webp") }
  ];
}

/**
 * Get default contact information
 */
function getDefaultContact() {
  return {
    sections: [
      {
        title: "小红书",
        icon: "Heart",
        description: "关注我们的小红书账号，了解龙舟队最新动态和精彩瞬间",
        link: "https://xiaohongshu.com/user/profile/pentasus-dragonboat"
      },
      {
        title: "微信公众号",
        icon: "MessageCircle",
        description: "扫码关注「Pentasus龙舟队」公众号, 获取第一手训练资讯和比赛信息",
        qrCode: "/images/wechat-qr.png"
      },
      {
        title: "训练时间地点",
        icon: "MapPin",
        description: "Fort Point Pier • 每周三、日 • 专业指导 • 欢迎新成员"
      }
    ]
  };
}

/**
 * Fallback site data when configuration fails to load
 */
function getFallbackSiteData(): SiteData {
  const fallbackSiteConfig: SiteConfig = {
    name: "PENTASUS",
    tagline: "Champions on water, friends for life",
    description: "United by tradition, driven by excellence.",
    logo: getImagePath("/images/logo/pentasus-logo.png"),
    logoFallback: "waves",
    favicon: getImagePath("/favicon.ico"),
    wechatBlogUrl: "https://mp.weixin.qq.com/s/pentasus-dragon-boat-journey",
    hero: {
      backgroundImage: "",
      fallbackGradient: "from-yellow-100 via-pink-100 to-blue-100",
      logoEnhancement: { dropShadow: true, shadowIntensity: 'medium', shadowColor: 'rgba(0, 0, 0, 0.3)' },
      overlay: { enabled: false, type: 'none', solid: "", gradient: "" },
      textOptimization: { useWhiteText: false, addTextShadow: false, enhanceContrast: false, shadowIntensity: 'medium' },
      title: "PENTASUS",
      subtitle: "Champions on water, friends for life",
      description: "United by tradition, driven by excellence."
    }
  };

  return {
    site: fallbackSiteConfig,
    navigation: getDefaultNavigation(),
    universities: getDefaultUniversities(),
    contact: getDefaultContact()
  };
}